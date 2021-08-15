/*
Copyright 2020 Bruno Windels <bruno@windels.cloud>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import {TemplateView} from "../general/TemplateView.js";
import {hydrogenGithubLink} from "./common.js";
import {PasswordLoginView} from "./PasswordLoginView.js";
import {CompleteSSOView} from "./CompleteSSOView.js";

export class LoginView extends TemplateView {
    render(t) {
        return t.div({ className: "PreSessionScreen" }, [
            t.div({ className: "logo" }),
            t.mapView(vm => vm.passwordLoginViewModel, vm => vm? new PasswordLoginView(vm): null),
            t.mapView(vm => vm.ssoLoginViewModel, vm => {
                if (vm?.isSSOCompletion) {
                    return new CompleteSSOView(vm);
                }
                else if (vm) {
                    return new SSOLoginView(vm);
                }
                return null;
            } ),
            // use t.mapView rather than t.if to create a new view when the view model changes too
            t.p(hydrogenGithubLink(t))
        ]);
    }
}

class SSOLoginView extends TemplateView {
    render(t, vm) {
        return t.button({className: "SSO", type: "button", onClick: () => vm.startSSOLogin()}, "Login with SSO");
    }
}
