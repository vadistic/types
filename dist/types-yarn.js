#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Octokit = require("@octokit/rest");
var semver = require("semver");
var json = require("jsonfile");
var path = require("path");
var execa = require("execa");
var OWNER = 'vadistic';
var REPO = 'types';
var GIT_URL = 'https://github.com';
var DEBUG = false;
var versionRegex = /(?!v)([0-9]+\.[0-9]+\.[0-9]+(-[0-z-.]+)?)(?=-gitpkg)/;
var tagsCache;
var listAvalibleVersions = function (pkgName) { return __awaiter(_this, void 0, void 0, function () {
    var upstreamName, nameRegex, octokit, tags, _a, packagesList;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                upstreamName = pkgName.replace('@types/', '');
                DEBUG && console.log('listing versions for name: ', pkgName, upstreamName);
                nameRegex = new RegExp("(types-)?" + upstreamName + "-v[0-9].[0-9].[0-9]-[0-9]+-gitpkg");
                octokit = new Octokit();
                _a = tagsCache;
                if (_a) return [3 /*break*/, 2];
                return [4 /*yield*/, octokit.repos.listTags({
                        owner: OWNER,
                        repo: REPO,
                        per_page: 100,
                        page: 0,
                    })];
            case 1:
                _a = (_b.sent()).data;
                _b.label = 2;
            case 2:
                tags = _a;
                tagsCache = tags;
                packagesList = tags
                    .filter(function (tag) { return tag.name.match(nameRegex); })
                    .map(function (tag) { return ({
                    name: pkgName,
                    tag: tag.name,
                    version: tag.name.match(versionRegex)[0],
                }); });
                DEBUG && console.log('packagesList: ', packagesList);
                return [2 /*return*/, packagesList];
        }
    });
}); };
var getLatestVersion = function (packages, init) {
    return packages.reduce(function (prev, current) {
        return !prev || semver.gt(current.version, prev.version) ? current : prev;
    }, init);
};
exports.default = (function () { return __awaiter(_this, void 0, void 0, function () {
    var arg, searchName, packagesList, latestVersion, pkg, typings, outdated;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                process.argv.forEach(function (val, i, arr) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (val === 'upgrade' || val === 'outdated') {
                            arg = val;
                        }
                        if (val === 'list') {
                            arg = val;
                            searchName = arr[i + 1];
                        }
                        return [2 /*return*/];
                    });
                }); });
                if (!arg) {
                    console.log("\n      Upgrade script from vadistic/types (making up for lack of yarn support)\n\n      Usage:  -upgrade [command]\n\n      Commands:\n      Check avalibility & latest version\n      $info package_name\n\n      outdated\n\n      List outdated typings\n      $ type-upgrade outdated\n\n      upgrade\n\n      Install latest typings\n      $ type-upgrade upgrade\n      ");
                    process.exit();
                }
                if (!(arg === 'list' && searchName)) return [3 /*break*/, 2];
                return [4 /*yield*/, listAvalibleVersions(searchName)];
            case 1:
                packagesList = _a.sent();
                if (packagesList.length === 0) {
                    console.log("No packages found for name: " + searchName);
                }
                else {
                    latestVersion = getLatestVersion(packagesList);
                    console.log(searchName + ": " + packagesList.length + " versions found");
                    console.log('Latest:\n', JSON.stringify(latestVersion, null, 2));
                    console.log('\nInstall:');
                    console.log("yarn add -D " + OWNER + "/" + REPO + "/#" + latestVersion.tag);
                }
                process.exit();
                return [2 /*return*/, 0];
            case 2:
                pkg = json.readFileSync(path.resolve(process.cwd(), 'package.json'));
                typings = Object.entries(__assign({}, pkg.devDependencies, pkg.dependencies)).filter(function (_a) {
                    var name = _a[0], repo = _a[1];
                    return repo.match(OWNER + "/" + REPO + "#");
                });
                DEBUG && console.log('typings: ', typings);
                if (typings.length === 0) {
                    console.log("No git typings found");
                    process.exit();
                    return [2 /*return*/, 0];
                }
                outdated = [];
                typings.forEach(function (_a) {
                    var name = _a[0], repo = _a[1];
                    return __awaiter(_this, void 0, void 0, function () {
                        var installedVersion, packagesList, latestVersion, command, cmd;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    installedVersion = repo.match(versionRegex)[0];
                                    return [4 /*yield*/, listAvalibleVersions(name)];
                                case 1:
                                    packagesList = _b.sent();
                                    latestVersion = getLatestVersion(packagesList, {
                                        version: installedVersion,
                                        name: name,
                                        tag: repo.replace(GIT_URL + "/" + OWNER + "/" + REPO + "/#", ''),
                                    });
                                    if (semver.gt(latestVersion.version, installedVersion)) {
                                        outdated.push({
                                            name: name,
                                            tag: latestVersion.tag,
                                            installedVersion: installedVersion,
                                            version: latestVersion.version,
                                        });
                                    }
                                    DEBUG && console.log('outdated: ', outdated);
                                    if (outdated.length === 0) {
                                        console.log("Everything's up to date!");
                                    }
                                    else {
                                        console.log("Found outdated typings packages");
                                        outdated.forEach(function (entry) {
                                            console.log(entry.name + ": " + entry.installedVersion + " => " + entry.version);
                                        });
                                        if (arg === 'upgrade') {
                                            console.log('Installing...');
                                            command = "yarn add -D " + outdated
                                                .map(function (entry) { return OWNER + "/" + REPO + "#" + entry.tag; })
                                                .join(' ');
                                            cmd = execa.shell(command);
                                            cmd.stdout.pipe(process.stdout);
                                            cmd.then(function () {
                                                console.log('Types updated!');
                                            });
                                        }
                                    }
                                    return [2 /*return*/, 0];
                            }
                        });
                    });
                });
                return [2 /*return*/];
        }
    });
}); })();
