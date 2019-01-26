import { Injectable } from '@angular/core';
import {IOrganizationChartMarineSuffix} from "app/shared/model/organization-chart-marine-suffix.model";


@Injectable({ providedIn: 'root' })
export class TreeUtilities {
    constructor() {

    }
    private list_to_tree(list) {


        var map = {}, node, roots = [], i;
        for (i = 0; i < list.length; i += 1) {
            map[list[i].id] = i; // initialize the map
            list[i].children = []; // initialize the children
        }
        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            node.parentId = node.parentId == null ? 0 : node.parentId;
            if (node.parentId !== 0) {
                // if you have dangling branches check that map[node.parentId] exists
                list[map[node.parentId]].children.push(node);
            } else {
                roots.push(node);
            }
        }
        return roots;
    }
    private getChildrenIds(data) : number[]
    {
        let ids : number[] = [];
        if(data.children.length){
            data.children.forEach((a) => {
                let returnIds = this.getChildrenIds(a);
                returnIds.forEach((a) => ids.push(a));
            });
        }
        ids.push(data.id);
        return ids;
    }

    convertOrgChart2Tree(orgCharts: IOrganizationChartMarineSuffix[]){
        var listOfObjects = [];
        orgCharts.map(function (item) {
            var singleObj = {};
            singleObj['id'] = item.id;
            singleObj['name'] = item.title;
            singleObj['parentId'] = item.parentId;
            listOfObjects.push(singleObj);
        });
        return this.list_to_tree(listOfObjects);
    }
    result: number[] = [];
    getParentIds(organizationcharts: IOrganizationChartMarineSuffix[] ,organizationChartId: number) : number[] {
        let getOrg = organizationcharts.find(a => a.id == organizationChartId);
        if(getOrg.parentId){
            this.result.push(getOrg.id);
            return this.getParentIds(organizationcharts, getOrg.parentId);
        }
        this.result.push(organizationChartId);
        return this.result;
    }
    getParentId(organizationcharts: IOrganizationChartMarineSuffix[] ,organizationChartId: number) : number {
        let getOrg = organizationcharts.find(a => a.id == organizationChartId);
        if(getOrg.parentId){
            //this.result.push(getOrg.id);
            return this.getParentId(organizationcharts, getOrg.parentId);
        }
        //this.result.push(organizationChartId);
        return getOrg.id;
    }
    getAllOfThisTreeIds(organizationcharts: IOrganizationChartMarineSuffix[] ,organizationChartId: number) : number[] {
        debugger;
        let rootId = this.getParentId(organizationcharts, organizationChartId);
        let nodes = this.convertOrgChart2Tree(organizationcharts);
        let node = nodes.find(a => a.id == rootId);
        return this.getChildrenIds(node);
    }
    getAllOfChilderenIdsOfThisId(organizationcharts: IOrganizationChartMarineSuffix[] ,organizationChartId: number) : number[] {
        let orgs = organizationcharts.filter(a => a.parentId == organizationChartId);
        if(orgs.length){
            orgs.forEach(a => {
                this.result.push(a.id);
                return this.getAllOfChilderenIdsOfThisId(organizationcharts,a.id);
            });
        }
        this.result.push(organizationChartId);
        return this.result;
    }
}
