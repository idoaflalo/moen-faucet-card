/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LitElement,
  html,
  TemplateResult,
  css,
  PropertyValues,
  CSSResultGroup,
} from 'lit';
import { customElement, property, state } from "lit/decorators";
import {
  HomeAssistant,
  hasConfigOrEntityChanged,
  ActionHandlerEvent,
  handleAction,
  LovelaceCardEditor,
} from 'custom-card-helpers';

import './editor';

import type { MoenFaucetCardConfig } from './types';
import { CARD_VERSION } from './const';
import { localize } from './localize/localize';

/* eslint no-console: 0 */
console.info(
  `%c  BOILERPLATE-CARD \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'moen-faucet-card',
  name: 'Moen Faucet Card',
  description: 'Moen Faucet card for choosing amounts for the faucet',
});

// TODO Name your custom element
@customElement('moen-faucet-card')
export class MoenFaucetCard extends LitElement {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement('moen-faucet-card-editor');
  }

  public static getStubConfig(): object {
    return {};
  }

  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private config!: MoenFaucetCardConfig;

  public setConfig(config: MoenFaucetCardConfig): void {
    if (!config) {
      throw new Error(localize('common.invalid_configuration'));
    }

    if (!config.entity) {
      throw new Error(localize('common.invalid_entity'));
    }

    this.config = {
      ...config,
    };
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  // https://lit-element.polymer-project.org/guide/templates
  protected render(): TemplateResult | void {
    const state = this.hass.states[this.config.entity];
    console.log(state)

    return html`
    <ha-card>
      <button>hello</button>
    </ha-card>
    `;
  }

  // https://lit-element.polymer-project.org/guide/styles
  static get styles(): CSSResultGroup {
    return css``;
  }
}
