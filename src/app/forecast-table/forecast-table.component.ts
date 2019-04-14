import { OnInit, Component, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ForecastTableItem, ForecastTableDataSource } from './forecast-table-datasource';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forecast-table',
  templateUrl: './forecast-table.component.html',
  styleUrls: ['./forecast-table.component.css']
})
export class ForecastTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() data: Observable<ForecastTableItem[]>;
  dataSource: ForecastTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['dt', 'temp', 'pressure', 'humidity'];

  ngOnInit() {
    this.dataSource = new ForecastTableDataSource(this.data, this.paginator, this.sort);
  }

  ngOnChanges(changes: SimpleChanges) {

    this.data = changes.data.currentValue;

  }
}
