import { observable, action } from "mobx";
import axios from 'axios';
import _ from 'lodash';

const firebaseTransformObjectToArray = (obj) => {
    return _.values(_.mapValues(obj, (value, key) => { value.id = key; return value; }));
};

export default class FormsDataModel {
    @observable formsData = [];
    @observable formsDataMap = {};
    @observable isLoadingFormsData = false;
    @observable isLoggedIn = false;

    @action checkPassword(password) {
        this.isLoggedIn = password === 'Naive';
    }

    @action loadFormsData() {
        this.isLoadingFormsData = true;
        axios.get('http://nucssa.org/formdata/')
            .then(
                action(
                    (res) => {
                        this.formsDataMap = res.data;
                        let formsData = firebaseTransformObjectToArray(res.data);
                        this.formsData = _.sortBy(formsData, (formData) => {
                            return -formData.id;
                        });
                        this.isLoadingFormsData = false;
                    }
                )
            )
            .catch(
                action(
                    (err) => {
                        this.isLoadingFormsData = false;
                        this.formsData = [];
                    }
                )
            );
    }

}
