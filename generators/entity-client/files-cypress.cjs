/**
 * Copyright 2013-2022 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const constants = require('../generator-constants');

const { CLIENT_TEST_SRC_DIR } = constants;

const cypressEntityFiles = {
  testsCypress: [
    {
      condition: generator => generator.cypressTests && !generator.embedded,
      path: generator => generator.cypressFolder,
      templates: [
        {
          file: 'e2e/entity/entity.cy.ts',
          renameTo: generator => `e2e/entity/${generator.entityFileName}.cy.ts`,
        },
      ],
    },
  ],
};

function cleanupCypressEntityFiles() {
  if (!this.cypressTests) return;
  this.cypressFolder = `${this.CLIENT_TEST_SRC_DIR}cypress/`;
  if (this.isJhipsterVersionLessThan('7.8.2')) {
    this.removeFile(`${this.cypressFolder}integration/entity/${this.entityFileName}.spec.ts`);
  }
}

function writeCypressEntityFiles() {
  if (this.skipClient || !this.cypressTests) return undefined;
  this.cypressFolder = `${this.CLIENT_TEST_SRC_DIR}cypress/`;
  return this.writeFiles({ sections: cypressEntityFiles, rootTemplatesPath: 'cypress' });
}

module.exports = {
  cypressEntityFiles,
  cleanupCypressEntityFiles,
  writeCypressEntityFiles,
};
