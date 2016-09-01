import { Component, Input } from '@angular/core';
import { Apollo } from 'angular2-apollo';

import { client } from '../apollo-client-init';
import { ShipmentShortWithDataQuery } from './shipment-short-with-data.interface';

import gql from 'graphql-tag';

@Component({
  selector: 'shipment-short-with-data',
  template: `
    <shipment-short *ngIf="!data.loading" [shipment]="data.shipment">
  `,
})
@Apollo({
  client,
  queries: (component: ShipmentShortWithDataComponent) => ({
    data: {
      query: gql`
        query getShipment($id: String!) {
          shipment(id: $id) {
            id
            name
            revenue
            captain
          }
        }
      `,
      variables: {
        id: component.shipmentId
      }
    }
  })
})
export class ShipmentShortWithDataComponent {
  @Input() shipmentId: string;

  data: ShipmentShortWithDataQuery;
}
