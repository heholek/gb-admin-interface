import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <div>
      <span class="created-by">Created with ♥ by
          <b><a href="https://caelinsutch.com" target="_blank">Caelin Sutch</a></b>  and
          <b><a href="https://arcc.ai" target="_blank">ARCC</a></b>
          {{ currentYear }}</span>
        <a routerLink="terms-and-conditions" class="font-weight-bold ml-1">Terms and Conditions</a>
    </div>
    <div class="socials">
      <a href="https://github.com/caelinsutch" target="_blank" class="ion ion-social-github"></a>
<!--      <a href="#" target="_blank" class="ion ion-social-facebook"></a>-->
<!--      <a href="#" target="_blank" class="ion ion-social-twitter"></a>-->
<!--      <a href="#" target="_blank" class="ion ion-social-linkedin"></a>-->
    </div>
  `,
})
export class FooterComponent {
  get currentYear(): number {
    return new Date().getFullYear();
  }
}
