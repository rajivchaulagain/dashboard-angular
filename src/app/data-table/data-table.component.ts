import { Component } from '@angular/core';

// Data model type for Employee
export interface Employee {
  name: string;
  id: number;
  panNumber: string;
  address: string;
  phoneNumber: string;
  position: string;
}

// Sample data for Employees
const employees: Employee[] = [
  { name: "John Doe", id: 123, panNumber: "ABCDE1234F", address: "123 Main St, City, Country", phoneNumber: "123-456-7890", position: "Software Engineer" },
  { name: "Alice Smith", id: 124, panNumber: "FGHIJ5678K", address: "456 Elm St, Town, Country", phoneNumber: "234-567-8901", position: "Project Manager" },
  { name: "Bob Johnson", id: 125, panNumber: "KLMNO9876P", address: "789 Maple St, Village, Country", phoneNumber: "345-678-9012", position: "Business Analyst" },
  { name: "Charlie Brown", id: 126, panNumber: "PQRST4321U", address: "101 Oak St, Hamlet, Country", phoneNumber: "456-789-0123", position: "Quality Assurance" },
  { name: "David Wilson", id: 127, panNumber: "UVWXY6543Z", address: "202 Pine St, Metropolis, Country", phoneNumber: "567-890-1234", position: "HR Manager" },
  { name: "Eva Green", id: 128, panNumber: "ABCDE9876Y", address: "303 Cedar St, Borough, Country", phoneNumber: "678-901-2345", position: "Finance Officer" }
];

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {
  displayedColumns: string[] = ['id', 'name', 'panNumber', 'address', 'phoneNumber', 'position'];
  dataSource = employees;
}