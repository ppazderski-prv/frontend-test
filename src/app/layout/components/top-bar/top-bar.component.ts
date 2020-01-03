import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../../services/jwt.service';
import { ITokenUser } from '../../../interfaces/i-token-user';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  public tokenUser: ITokenUser;

  constructor(private jwtService: JwtService) { }

  ngOnInit() {
    this.tokenUser = this.jwtService.tokenUser;
  }
}
