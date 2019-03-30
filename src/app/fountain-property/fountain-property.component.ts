/*
 * @license
 * (c) Copyright 2019 | MY-D Foundation | Created by Matthew Moy de Vitry
 * Use of this code is governed by the GNU Affero General Public License (https://www.gnu.org/licenses/agpl-3.0)
 * and the profit contribution agreement available at https://www.my-d.org/ProfitContributionAgreement
 */

import {Component, Input, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {SELECT_PROPERTY} from '../actions';
import {IAppState} from '../store';
import {propertyStatuses} from '../constants';
import {PropertyMetadata} from '../types';
import {translateExpression} from '@angular/compiler-cli/src/ngtsc/transform/src/translator';

@Component({
  selector: 'f-property',
  templateUrl: './fountain-property.component.html',
  styleUrls: ['./fountain-property.component.css']
})
export class FountainPropertyComponent implements OnInit {
  @Input('property') property: PropertyMetadata;
  @Input('propMeta') propMeta: PropertyMetadata;
  @select('fountainSelected') f;
  WARN = propertyStatuses.warning;
  INFO = propertyStatuses.info;
  OK = propertyStatuses.ok;
  title = '';

  constructor(private ngRedux: NgRedux<IAppState>) {
  }

  ngOnInit() {
  }

  viewProperty(): void {
    // let p = this.ngRedux.getState().fountainSelected.properties[this.pName];
    this.ngRedux.dispatch({type: SELECT_PROPERTY, payload: this.property});
  }

  private makeTitle() {
    // creates title string
    let texts = [];
    for (let src of this.propMeta[this.property.name].src_pref){
      let property_txt = this.propMeta[this.property.name].src_config[src].src_path.slice(0,2).join('>');
      texts.push(`${property_txt} in ${src}`);
    }
    return texts.join(' or ')
  }
}
