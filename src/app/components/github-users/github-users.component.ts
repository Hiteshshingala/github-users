import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { IResponse, IUser } from '../../interface';
import { ColDef, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-github-users',
  templateUrl: './github-users.component.html',
  styleUrls: ['./github-users.component.scss'],
})
export class GithubUsersComponent implements OnInit {
  protected githubUsers: IUser[] = [];
  protected timeoutId: NodeJS.Timeout;
  protected filterByUserName: string = '';
  protected filterByName: string = '';
  protected filterByLogin: string = '';
  protected currentPage: number = 1;
  protected itemsPerPage: number = 10;
  protected totalPages: number = 0;
  protected displayPageRange: number[] = [];
  protected isLoading: boolean = false;
  protected columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'id',
    },
    {
      field: 'login',
      headerName: 'UserName',
    },
    {
      field: 'avatar_url',
      headerName: 'Avatar',
      cellRenderer: function (params: ICellRendererParams) {
        let newLink = `<img class="avatar" src=${params.value} alt="Image Description">`;
        return newLink;
      },
    },
    {
      field: 'html_url',
      headerName: 'Profile',
      wrapText: true,
      autoHeight: true,
      cellRenderer: function (params: ICellRendererParams) {
        let newLink = `<a href= ${params.value}
        target="_blank">${params.value}</a>`;
        return newLink;
      },
    },
    {
      field: 'followers_url',
      headerName: 'Followers',
      wrapText: true,
      autoHeight: true,
      cellRenderer: function (params: ICellRendererParams) {
        let newLink = `<a href= ${params.value}
        target="_blank">${params.value}</a>`;
        return newLink;
      },
    },
    {
      field: 'events_url',
      headerName: 'Events',
      wrapText: true,
      autoHeight: true,
      cellRenderer: function (params: ICellRendererParams) {
        let newLink = `<a href= ${params.value}
        target="_blank">${params.value}</a>`;
        return newLink;
      },
    },
    {
      field: 'score',
      headerName: 'Score',
    },
    {
      field: 'type',
      headerName: 'User Type',
    },
    {
      field: 'node_id',
      headerName: 'Node Id',
    },
  ];

  constructor(private apiService: ApiService) {}

  public ngOnInit(): void {
    this.getUsers();
  }

  protected applyFilters() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.goToPage(1);
    }, 500);
  }

  private getUsers(
    filterByUserName?: string,
    filterByName?: string,
    filterByLogin?: string,
  ) {
    this.isLoading = true;
    this.apiService
      .getUsers(
        this.currentPage,
        this.itemsPerPage,
        filterByUserName,
        filterByName,
        filterByLogin,
      )
      .subscribe({
        next: (res: IResponse<IUser>) => {
          if (res.total_count) {
            this.githubUsers = res.items;
            this.totalPages = Math.ceil(res.total_count / this.itemsPerPage);
            this.setPageRange(this.currentPage);
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error:', error);
          this.isLoading = false;
        },
      });
  }

  protected goToPreviousPage() {
    this.goToPage(
      this.currentPage > 1 ? this.currentPage - 1 : this.currentPage,
    );
  }

  protected goToNextPage() {
    this.goToPage(
      this.totalPages > this.currentPage + 1
        ? this.currentPage + 1
        : this.currentPage,
    );
  }

  protected goToPage(page: number) {
    this.currentPage = page;
    this.getUsers(this.filterByUserName, this.filterByName, this.filterByLogin);
  }

  private setPageRange(currentPage: number) {
    const visiblePages = 5;
    const halfVisiblePages = Math.floor(visiblePages / 2);
    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = startPage + visiblePages - 1;

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(endPage - visiblePages + 1, 1);
    }
    const pageRange = [];
    for (let page = startPage; page <= endPage; page++) {
      pageRange.push(page);
    }
    this.displayPageRange = pageRange;
  }
}
