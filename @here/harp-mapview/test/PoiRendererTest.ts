/*
 * Copyright (C) 2017-2020 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */

// tslint:disable:no-unused-expression
//    expect-type assertions are unused expressions and are perfectly valid

// tslint:disable:no-empty
//    lots of stubs are needed which are just placeholders and are empty

// tslint:disable:only-arrow-functions
//    Mocha discourages using arrow functions, see https://mochajs.org/#arrow-functions

import { expect } from "chai";
import * as THREE from "three";

import { Env } from "@here/harp-datasource-protocol";
import { Math2D } from "@here/harp-utils";

import { PoiRenderer } from "../lib/poi/PoiRenderer";

describe("PoiRenderer", function() {
    describe("computeIconScreenBox", function() {
        it("computes screen box without offset", function() {
            const poiInfo = {
                computedWidth: 32,
                computedHeight: 32,
                mayOverlap: false,
                poiRenderBatch: 1,
                technique: {}
            };
            const env = new Env();
            const screenBox = new Math2D.Box();

            PoiRenderer.computeIconScreenBox(
                poiInfo as any,
                new THREE.Vector2(),
                1.0,
                env,
                screenBox
            );
            expect(screenBox.x).to.equal(-16);
            expect(screenBox.y).to.equal(-16);
            expect(screenBox.w).to.equal(32);
            expect(screenBox.h).to.equal(32);
        });

        it("computes screen box with offset", function() {
            const poiInfo = {
                computedWidth: 32,
                computedHeight: 32,
                mayOverlap: false,
                poiRenderBatch: 1,
                technique: {
                    iconXOffset: 16,
                    iconYOffset: -16
                }
            };
            const env = new Env();
            const screenBox = new Math2D.Box();

            PoiRenderer.computeIconScreenBox(
                poiInfo as any,
                new THREE.Vector2(),
                1.0,
                env,
                screenBox
            );
            expect(screenBox.x).to.equal(0);
            expect(screenBox.y).to.equal(-32);
            expect(screenBox.w).to.equal(32);
            expect(screenBox.h).to.equal(32);
        });

        it("computes screen box with scale", function() {
            const poiInfo = {
                computedWidth: 32,
                computedHeight: 32,
                mayOverlap: false,
                poiRenderBatch: 1,
                technique: {
                    iconXOffset: 16,
                    iconYOffset: -16
                }
            };
            const env = new Env();
            const screenBox = new Math2D.Box();

            PoiRenderer.computeIconScreenBox(
                poiInfo as any,
                new THREE.Vector2(),
                0.5,
                env,
                screenBox
            );
            expect(screenBox.x).to.equal(0);
            expect(screenBox.y).to.equal(-16);
            expect(screenBox.w).to.equal(16);
            expect(screenBox.h).to.equal(16);
        });
    });
});
