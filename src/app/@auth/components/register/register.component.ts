import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  NB_AUTH_OPTIONS,
  NbAuthSocialLink,
  NbAuthService,
  NbAuthResult,
  NbTokenStorage,
} from '@nebular/auth';
import { getDeepFromObject } from '../../helpers';
import { EMAIL_PATTERN } from '../constants';
import {FileUploader, FileUploaderOptions, ParsedResponseHeaders} from 'ng2-file-upload';
import {environment} from '../../../../environments/environment';
import {User} from '../../../@core/interfaces/common/users';

@Component({
  selector: 'ngx-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxRegisterComponent implements OnInit {

  public uploader: FileUploader;
  responses: Array<any>;
  profilePhoto: string = '';
  uploading: boolean;
  uploaded = false;

  minLength: number = this.getConfigValue('forms.validation.password.minLength');
  maxLength: number = this.getConfigValue('forms.validation.password.maxLength');
  isFullNameRequired: boolean = this.getConfigValue('forms.validation.fullName.required');
  isEmailRequired: boolean = this.getConfigValue('forms.validation.email.required');
  isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');
  redirectDelay: number = this.getConfigValue('forms.register.redirectDelay');
  showMessages: any = this.getConfigValue('forms.register.showMessages');
  strategy: string = this.getConfigValue('forms.register.strategy');
  socialLinks: NbAuthSocialLink[] = this.getConfigValue('forms.login.socialLinks');

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: User;

  registerForm: FormGroup;
  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    private fb: FormBuilder,
    protected router: Router,
    private tokenService: NbTokenStorage,
  ) { }

  get fullName() { return this.registerForm.get('fullName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get terms() { return this.registerForm.get('terms'); }

  ngOnInit(): void {

    const emailValidators = [
      Validators.pattern(EMAIL_PATTERN),
    ];
    this.isEmailRequired && emailValidators.push(Validators.required);

    const passwordValidators = [
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
    ];
    this.isPasswordRequired && passwordValidators.push(Validators.required);

    this.registerForm = this.fb.group({
      fullName: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [...emailValidators]),
      password: this.fb.control('', [...passwordValidators]),
      confirmPassword: this.fb.control('', [...passwordValidators]),
      terms: this.fb.control(''),
    });

    // Init File Uploader
    const uploaderOptions: FileUploaderOptions = {
      url: `${environment.apiUrl}/users/profilepicture`,
      autoUpload: true,
      isHTML5: true,
      itemAlias: 'image',
      authToken: 'Bearer ' + this.tokenService.get().getValue(),
    };
    this.uploader = new FileUploader(uploaderOptions);
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      fileItem.withCredentials = false;
      return { fileItem };
    };
    this.uploader.onBeforeUploadItem = (fileItem => {
      this.uploading = true;
    });
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
      const data = JSON.parse(response);
      this.uploading = false;
      this.profilePhoto = data.profilePictureUrl;
      this.uploaded = true;
    };
  }

  uploadFile() {
    const element: HTMLElement = document.getElementById('file-upload') as HTMLElement;
    element.click();
  }

  register(): void {
    this.user = this.registerForm.value;
    this.user.themeName = 'cosmic';
    this.user.picture = this.profilePhoto;
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.register(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    },
      (error => {
      }));
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
