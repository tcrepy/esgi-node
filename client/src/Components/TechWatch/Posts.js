import React, {useContext, useEffect} from "react";
import {CategoryContext} from "../../Context/CategoryContext";
import {makeStyles} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {PostByCategory} from "./PostByCategory";
import * as PropTypes from "prop-types";
import {withAlert} from "../../Provider/AlertProvider";
import Typography from "@material-ui/core/Typography";

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.default,
    },
    noShadow: {
        boxShadow: "none"
    }
}));

export const Posts = withAlert(({error}) => {
    const context = useContext(CategoryContext);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    useEffect(() => {
        context.getCategories().catch(err => error(err.toString()));
    }, []);

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" className={classes.noShadow}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="All"/>
                    {
                        context.categories.map((item, key) => <Tab key={key+1} label={item.title}/>)
                    }
                </Tabs>
                {value === 0 && <TabContainer><PostByCategory category={null}/></TabContainer>}
                {
                    context.categories.map((item, key) => { return value === key+1 && <TabContainer key={key+1}><PostByCategory category={item}/></TabContainer>})
                }
            </AppBar>
        </div>
    )
});