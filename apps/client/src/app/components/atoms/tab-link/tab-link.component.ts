import { Component, OnInit, Input } from '@angular/core';

interface Link {
  name: string
  link: string
}

@Component({
  selector: 'app-a-tab-link',
  templateUrl: './tab-link.component.html',
  styleUrls: ['./tab-link.component.scss']
})
export class TabLinkComponent {
  @Input() links: Link[] = []
}
