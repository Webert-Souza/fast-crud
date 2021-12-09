import React from "react";
import { Switch, Route } from "react-router-dom";

import { GroupsList } from "./pages/groupsList";
import { UsersList } from "./pages/usersList";
import { UsersForm } from "./pages/usersForm";
import { Home } from "./pages/home";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/groups" component={GroupsList} />
        <Route exact path="/users" component={UsersList} />
        <Route exact path="/users/create" component={UsersForm} />
        <Route exact path="/users/update/:id" component={UsersForm} />
        <Route path="*" component={Home} />
      </Switch>
    </>
  );
};

export default Routes;
