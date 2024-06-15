import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface Employee {
  name: string;
  id: number;
  panNumber: string;
  address: string;
  phoneNumber: string;
  position: string
}

// TODO: replace this with real data from your application
const employees: Employee[] = [
  {
    name: "John Doe",
    id: 123,
    panNumber: "ABCDE1234F",
    address: "123 Main St, City, Country",
    phoneNumber: "123-456-7890",
    position: "Software Engineer"
  },
  {
    name: "Alice Smith",
    id: 124,
    panNumber: "FGHIJ5678K",
    address: "456 Elm St, Town, Country",
    phoneNumber: "234-567-8901",
    position: "Project Manager"
  },
  {
    name: "Bob Johnson",
    id: 125,
    panNumber: "KLMNO9876P",
    address: "789 Maple St, Village, Country",
    phoneNumber: "345-678-9012",
    position: "Business Analyst"
  },
  {
    name: "Charlie Brown",
    id: 126,
    panNumber: "PQRST4321U",
    address: "101 Oak St, Hamlet, Country",
    phoneNumber: "456-789-0123",
    position: "Quality Assurance"
  },
  {
    name: "David Wilson",
    id: 127,
    panNumber: "UVWXY6543Z",
    address: "202 Pine St, Metropolis, Country",
    phoneNumber: "567-890-1234",
    position: "HR Manager"
  },
  {
    name: "Eva Green",
    id: 128,
    panNumber: "ABCDE9876Y",
    address: "303 Cedar St, Borough, Country",
    phoneNumber: "678-901-2345",
    position: "Finance Officer"
  }
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<Employee> {
  data: Employee[] = employees;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Employee[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Employee[]): Employee[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Employee[]): Employee[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
