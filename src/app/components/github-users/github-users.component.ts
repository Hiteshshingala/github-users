import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import { IResponse, IUser } from '../../interface'
import { ColDef, ICellRendererParams } from 'ag-grid-community';


@Component({
  selector: 'app-github-users',
  templateUrl: './github-users.component.html',
  styleUrls: ['./github-users.component.scss']
})
export class GithubUsersComponent implements OnInit {

  githubUsers: IUser[] = [];
  timeoutId: NodeJS.Timeout = setTimeout(()=> {}, 2);
  filterByUserName: string = '';
  filterByEmail: string = '';
  filterById: string = '';
  columnDefs: ColDef[] = [
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
      cellRenderer: function(params: ICellRendererParams) {
        let newLink =  `<img class="avatar" src=${params.value} alt="Image Description">`;
        return newLink;
    }}, 
    { 
      field: "html_url",
      headerName: "Profile",
      wrapText: true,
      autoHeight: true,
      cellRenderer: function(params: ICellRendererParams) {
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
      cellRenderer: function(params: ICellRendererParams) {
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
      cellRenderer: function(params: ICellRendererParams) {
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

  constructor(
    private apiService: ApiService
  ) { 
    
  }

  public ngOnInit(): void {
    this.getUsers();
  }

  
  protected applyFilters() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.getUsers(this.filterByUserName, this.filterByEmail, this.filterById)
    }, 500);
  }
  
  private getUsers(filterByUserName?: string, filterByEmail?: string, filterById?: string){
    this.apiService.getUsers(filterByUserName, filterByEmail, filterById).subscribe({
      next: (res: IResponse<IUser>) => {
        if(res.total_count) {
          this.githubUsers = res.items;
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }  
    });
  }



}
