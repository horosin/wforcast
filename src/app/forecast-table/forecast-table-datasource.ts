import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map, flatMap } from 'rxjs/operators';
import { Observable, of, merge } from 'rxjs';

export interface ForecastTableItem {
  dt: number;
  main: {
    temp: number,
    pressure: number,
    humidity: number
  }
}

/**
 * Data source for the ForecastTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ForecastTableDataSource extends DataSource<ForecastTableItem> {
  public data: ForecastTableItem[] = [];

  constructor(
    private dataObservable: Observable<ForecastTableItem[]>,
    private paginator: MatPaginator,
    private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ForecastTableItem[]> {

    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    return this.dataObservable.pipe(flatMap(res => {
      this.data = res;
      this.paginator.length = this.data.length;

      const dataMutations = [
        of(this.data),
        this.paginator.page,
        this.sort.sortChange
      ];

      return merge(...dataMutations).pipe(map(() => {
        return this.getPagedData(
          this.getSortedData([...this.data])
        );
      }));

    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ForecastTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ForecastTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'dt': return compare(a.dt, b.dt, isAsc);
        case 'temp': return compare(a.main.temp, b.main.temp, isAsc);
        case 'pressure': return compare(a.main.pressure, b.main.pressure, isAsc);
        case 'humidity': return compare(a.main.humidity, b.main.humidity, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
