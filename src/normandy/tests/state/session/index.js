import faker from 'faker';
import { List } from 'immutable';

import { Factory, Field } from 'normandy/tests/factory';

export const INITIAL_STATE = {
  history: new List(),
};

export class SessionFactory extends Factory {
  getFields() {
    return {
      url: new Field(faker.internet.url),
      caption: new Field(faker.lorem.text),
      category: new Field(faker.lorem.slug),
    };
  }
}
