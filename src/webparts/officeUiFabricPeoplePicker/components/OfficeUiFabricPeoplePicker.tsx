import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import styles from './OfficeUiFabricPeoplePicker.module.scss';
import { IOfficeUiFabricPeoplePickerProps } from './IOfficeUiFabricPeoplePickerProps';

import {
  CompactPeoplePicker,
  IBasePickerSuggestionsProps,
  ListPeoplePicker,
  NormalPeoplePicker
} from 'office-ui-fabric-react/lib/Pickers';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested People',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading'
};
import {
  BaseComponent,
  assign,
  autobind
} from 'office-ui-fabric-react/lib//Utilities';
import { people } from './PeoplePickerExampleData';
import { IPersonaWithMenu } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePickerItems/PeoplePickerItem.Props';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
export interface IOfficeUiFabricPeoplePickerState {
  currentPicker?: number | string;
  delayResults?: boolean;
}

export default class OfficeUiFabricPeoplePicker extends React.Component<IOfficeUiFabricPeoplePickerProps, IOfficeUiFabricPeoplePickerState> {
  private _peopleList;
  private contextualMenuItems: IContextualMenuItem[] = [
    {
      key: 'newItem',
      icon: 'circlePlus',
      name: 'New'
    },
    {
      key: 'upload',
      icon: 'upload',
      name: 'Upload'
    },
    {
      key: 'divider_1',
      name: '-',
    },
    {
      key: 'rename',
      name: 'Rename'
    },
    {
      key: 'properties',
      name: 'Properties'
    },
    {
      key: 'disabled',
      name: 'Disabled item',
      disabled: true
    }
  ];
  constructor() {
    super();
    this._peopleList = [];
    people.forEach((persona: IPersonaProps) => {
      let target: IPersonaWithMenu = {};

      assign(target, persona, { menuItems: this.contextualMenuItems });
      this._peopleList.push(target);
    });

    this.state = {
      currentPicker: 1,
      delayResults: false
    };
  }

  public render(): React.ReactElement<IOfficeUiFabricPeoplePickerProps> {
    return (
      <NormalPeoplePicker
        onResolveSuggestions={ this._onFilterChanged }
        getTextFromItem={ (persona: IPersonaProps) => persona.primaryText }
        pickerSuggestionsProps={ suggestionProps }
        className={ 'ms-PeoplePicker' }
        key={ 'normal' }
      />
      /*<div className={styles.helloWorld}>
        <div className={styles.container}>
          <div className={css('ms-Grid-row ms-bgColor-themeDark ms-fontColor-white', styles.row)}>
            <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
              <span className='ms-font-xl ms-fontColor-white'>
                Welcome to SharePoint!
              </span>
              <p className='ms-font-l ms-fontColor-white'>
                Customize SharePoint experiences using Web Parts.
              </p>
              <p className='ms-font-l ms-fontColor-white'>
                {this.props.description}
              </p>
              <a className={css('ms-Button', styles.button)}
                 href='https://github.com/SharePoint/sp-dev-docs/wiki'>
                <span className='ms-Button-label'>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>*/
    );
  }

  @autobind
  private _onFilterChanged(filterText: string, currentPersonas: IPersonaProps[], limitResults?: number) {
    if (filterText) {
      let filteredPersonas: IPersonaProps[] = this._filterPersonasByText(filterText);

      filteredPersonas = this._removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults ? filteredPersonas.splice(0, limitResults) : filteredPersonas;
      return this._filterPromise(filteredPersonas);
    } else {
      return [];
    }
  }

  private _filterPersonasByText(filterText: string): IPersonaProps[] {
    return this._peopleList.filter(item => this._doesTextStartWith(item.primaryText, filterText));
  }

  private _removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]) {
    return personas.filter(persona => !this._listContainsPersona(persona, possibleDupes));
  }
  private _listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]) {
    if (!personas || !personas.length || personas.length === 0) {
      return false;
    }
    return personas.filter(item => item.primaryText === persona.primaryText).length > 0;
  }
  private _filterPromise(personasToReturn: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> {
    if (this.state.delayResults) {
      return this._convertResultsToPromise(personasToReturn);
    } else {
      return personasToReturn;
    }
  }
  private _convertResultsToPromise(results: IPersonaProps[]): Promise<IPersonaProps[]> {
    return new Promise<IPersonaProps[]>((resolve, reject) => setTimeout(() => resolve(results), 2000));
  }
  private _doesTextStartWith(text: string, filterText: string): boolean {
    return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
  }
}
