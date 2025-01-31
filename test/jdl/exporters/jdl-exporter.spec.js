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

/* eslint-disable no-new, no-unused-expressions */
const { expect } = require('chai');
const { jestExpect } = require('mocha-expect-snapshot');

const fs = require('fs');
const JDLObject = require('../../../jdl/models/jdl-object');
const JDLEntity = require('../../../jdl/models/jdl-entity');
const JDLExporter = require('../../../jdl/exporters/jdl-exporter');
const JDLApplication = require('../../../jdl/models/jdl-application');

const {
  OptionNames: { CLIENT_FRAMEWORK },
} = require('../../../jdl/jhipster/application-options');
const { NO: NO_CLIENT_FRAMEWORK } = require('../../../jdl/jhipster/client-framework-types');

describe('JDLExporter', () => {
  describe('exportToJDL', () => {
    context('when passing invalid parameters', () => {
      context('such as undefined', () => {
        it('should fail', () => {
          expect(() => {
            JDLExporter.exportToJDL();
          }).to.throw(/^A JDLObject has to be passed to be exported\.$/);
        });
      });
    });
    context('when passing valid parameters', () => {
      context('with a path', () => {
        const PATH = 'myPath.jdl';
        let fileExistence;
        let jdlContent = '';

        before(() => {
          const jdlObject = new JDLObject();
          jdlObject.addEntity(
            new JDLEntity({
              name: 'Toto',
            })
          );
          JDLExporter.exportToJDL(jdlObject, PATH);
          fileExistence = fs.statSync(PATH).isFile();
          jdlContent = fs.readFileSync(PATH, 'utf-8').toString();
        });

        after(() => {
          fs.unlinkSync(PATH);
        });

        it('should export the JDL to the passed path', () => {
          expect(fileExistence).to.be.true;
        });
        it('should write the JDL inside the file', () => {
          expect(jdlContent).to.equal('entity Toto\n');
        });
      });
      context('without a path', () => {
        context('exports entity', () => {
          const DEFAULT_PATH = 'app.jdl';
          let fileExistence;
          let jdlContent = '';

          before(() => {
            const jdlObject = new JDLObject();
            jdlObject.addEntity(
              new JDLEntity({
                name: 'Toto',
              })
            );
            JDLExporter.exportToJDL(jdlObject);
            fileExistence = fs.statSync(DEFAULT_PATH).isFile();
            jdlContent = fs.readFileSync(DEFAULT_PATH, 'utf-8').toString();
          });

          after(() => {
            fs.unlinkSync(DEFAULT_PATH);
          });

          it('should export the JDL to the default one', () => {
            expect(fileExistence).to.be.true;
          });
          it('should write the JDL inside the file', () => {
            expect(jdlContent).to.equal('entity Toto\n');
          });
        });
        context('exports application', () => {
          context('with clientFramework no', () => {
            let jdlObject;
            before(() => {
              jdlObject = new JDLObject();
              jdlObject.addApplication(new JDLApplication({ config: { [CLIENT_FRAMEWORK]: NO_CLIENT_FRAMEWORK } }));
            });

            it('should export the JDL and match snapshot', () => {
              jestExpect(JDLExporter.exportToJDL(jdlObject, false)).toMatchInlineSnapshot(`
"application {
  config {
    clientFramework no
  }
}

"
`);
            });
          });
        });
      });
    });
  });
});
