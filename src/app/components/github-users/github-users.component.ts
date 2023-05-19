import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import { IResponse, IUser } from '../../interface'


@Component({
  selector: 'app-github-users',
  templateUrl: './github-users.component.html',
  styleUrls: ['./github-users.component.scss']
})
export class GithubUsersComponent implements OnInit {

  githubUsers: Array<IUser> = [];
  timeoutId: any;
  filter1: string = '';
  filter2: string = '';
  filter3: string = '';
  constructor(
    private apiService: ApiService
  ) { 
    
  }

  ngOnInit(): void {
    this.getUsers();
  }

  
  applyFilters() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.getUsers(this.filter1, this.filter2, this.filter3)
    }, 500);
  }
  
  getUsers(filter1?: string, filter2?: string, filter3?: string){
    this.apiService.getUsers(filter1, filter2, filter3).subscribe((res: IResponse<IUser>) => {
      if(res.total_count) {
        debugger
        const userData: Array<IUser> = [];
        res.items.forEach(el => {
          const user = {
            id: el.id,
            login: el.login,
            avatar_url: el.avatar_url,
            html_url: el.html_url,
            followers_url: el.followers_url,
            events_url: el.events_url,
            score: el.score,
            type: el.type,
            node_id: el.node_id,
          }
          userData.push(user);
        })
        this.githubUsers = userData;     
      }
    },(error) => {
      console.log('Error:', error);
    })
  }

  columnDefs = [
    { 
      field: "id",
      headerName: "id"
    }, 
    { 
      field: "login",
      headerName: "UserName"
    }, 
    { 
      field: "avatar_url",
      headerName: "Avatar",
      cellRenderer: function(params: any) {
        let newLink =  `<img class="avatar" src=${params.value} alt="Image Description">`;
        return newLink;
    }}, 
    { 
      field: "html_url",
      headerName: "Profile",
      wrapText: true,
      autoHeight: true,
      cellRenderer: function(params: any) {
        let newLink = 
        `<a href= ${params.value}
        target="_blank">${params.value}</a>`;
        return newLink;
    }}, 
    { 
      field: "followers_url",
      headerName: "Followers",
      wrapText: true,
      autoHeight: true,
      cellRenderer: function(params: any) {
        let newLink = 
        `<a href= ${params.value}
        target="_blank">${params.value}</a>`;
        return newLink;
    }}, 
    { 
      field: "events_url",
      headerName: "Events",
      wrapText: true,
      autoHeight: true,
      cellRenderer: function(params: any) {
        let newLink = 
        `<a href= ${params.value}
        target="_blank">${params.value}</a>`;
        return newLink;
    }}, 
    { 
      field: "score",
      headerName: "Score",
    }, 
    { 
      field: "type",
      headerName: "User Type",
    },
    { 
      field: "node_id",
      headerName: "Node Id",
    }
  ];

}
