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

/* eslint-disable no-unused-expressions */

const { jestExpect } = require('mocha-expect-snapshot');
const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const JHipsterDeploymentExporter = require('../../../jdl/exporters/jhipster-deployment-exporter');
const JDLDeployment = require('../../../jdl/models/jdl-deployment');
const { DeploymentTypes } = require('../../../jdl/jhipster/deployment-options');

const { DOCKERCOMPOSE, KUBERNETES } = DeploymentTypes;

describe('JHipsterDeploymentExporter', () => {
  describe('exportDeployments', () => {
    context('when passing invalid parameters', () => {
      context('such as undefined', () => {
        it('should fail', () => {
          expect(() => {
            JHipsterDeploymentExporter.exportDeployments();
          }).to.throw(/^Deployments have to be passed to be exported\.$/);
        });
      });
    });
    context('when passing valid arguments', () => {
      context('when exporting deployments to JSON', () => {
        let returned;

        before('common setup for both deployments', () => {
          returned = JHipsterDeploymentExporter.exportDeployments({
            'docker-compose': new JDLDeployment({
              deploymentType: DOCKERCOMPOSE,
              appsFolders: ['tata', 'titi'],
              dockerRepositoryName: 'test',
            }),
            kubernetes: new JDLDeployment({
              deploymentType: KUBERNETES,
              appsFolders: ['tata', 'titi'],
              dockerRepositoryName: 'test',
            }),
          });
        });

        it('should return the exported deployments', () => {
          expect(returned).to.have.lengthOf(2);
        });
        context('for the first deployment', () => {
          let content;

          before('setup for the first deployment', done => {
            fs.readFile(path.join('docker-compose', '.yo-rc.json'), { encoding: 'utf8' }, (err, data) => {
              if (err) {
                return done(err);
              }
              content = JSON.parse(data);
              return done();
            });
          });

          after('cleanup for the fist deployment', () => {
            fs.unlinkSync(path.join('docker-compose', '.yo-rc.json'));
            fs.rmdirSync('docker-compose');
          });

          it('should exports it', done => {
            fs.readFile(path.join('docker-compose', '.yo-rc.json'), { encoding: 'utf8' }, done);
          });

          it('should format it', () => {
            expect(content['generator-jhipster']).not.to.be.undefined;
            const config = content['generator-jhipster'];
            jestExpect(config).toMatchInlineSnapshot(`
Object {
  "appsFolders": Array [
    "tata",
    "titi",
  ],
  "clusteredDbApps": Array [],
  "deploymentType": "docker-compose",
  "directoryPath": "../",
  "dockerRepositoryName": "test",
  "gatewayType": "SpringCloudGateway",
  "monitoring": "no",
  "serviceDiscoveryType": "eureka",
}
`);
          });
        });
        context('for the second deployment', () => {
          let content;

          before('setup for the first deployment', done => {
            fs.readFile(path.join('kubernetes', '.yo-rc.json'), { encoding: 'utf8' }, (err, data) => {
              if (err) {
                return done(err);
              }
              content = JSON.parse(data);
              return done();
            });
          });

          after('cleanup for the fist deployment', () => {
            fs.unlinkSync(path.join('kubernetes', '.yo-rc.json'));
            fs.rmdirSync('kubernetes');
          });

          it('should exports it', done => {
            fs.readFile(path.join('kubernetes', '.yo-rc.json'), { encoding: 'utf8' }, done);
          });

          it('should format it', () => {
            expect(content['generator-jhipster']).not.to.be.undefined;
            const config = content['generator-jhipster'];
            jestExpect(config).toMatchInlineSnapshot(`
Object {
  "appsFolders": Array [
    "tata",
    "titi",
  ],
  "clusteredDbApps": Array [],
  "deploymentType": "kubernetes",
  "directoryPath": "../",
  "dockerPushCommand": "docker push",
  "dockerRepositoryName": "test",
  "ingressDomain": "",
  "istio": false,
  "kubernetesNamespace": "default",
  "kubernetesServiceType": "LoadBalancer",
  "kubernetesStorageClassName": "",
  "kubernetesUseDynamicStorage": false,
  "monitoring": "no",
  "serviceDiscoveryType": "eureka",
}
`);
          });
        });
      });
    });
  });
});
