import React, {useContext, useEffect, useMemo} from "react";
import Container from "@material-ui/core/Container";
import {UserContext} from "../../Context/UserContext";
import {withAlert} from "../../Provider/AlertProvider";
import {Profil} from "./Components/Profil";

export const ProfilContainer = withAlert(({error, ...props}) => {
        const context = useContext(UserContext);

        useEffect(() => {
            context.getById(props.match.params.id).catch(err => error(err.toString()));
        }, [props.match.params.id]);

        return useMemo(() => <Profil user={context.user}/>, [context]);
    }
);