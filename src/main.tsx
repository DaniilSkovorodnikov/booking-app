import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {AppShell, Badge, createTheme, MantineProvider, SegmentedControl, TextInput} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import classes from "./styles/basic-components.module.scss";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./store";
import {api} from "./store/api/api.ts";

const theme = createTheme({
    fontFamily: 'Ubuntu, sans-serif',
    components: {
        TextInput: TextInput.extend({
            classNames: {
                input: classes.textInput
            },
            defaultProps: {
                size: 'lg'
            }
        }),
        AppShell: AppShell.extend({
            classNames: {
                navbar: classes.navbar
            }
        }),
        SegmentedControl: SegmentedControl.extend({
            classNames: {
                root: classes.segmented,
                label: classes.segmentedLabel,
                indicator: classes.segmentedIndicator
            }
        }),
        Badge: Badge.extend({
            classNames: {
                root: classes.badge
            },
            defaultProps: {
                py: 10
            }
        })
    }
})

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <MantineProvider theme={theme}>
            <Notifications/>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </MantineProvider>
    </Provider>
    ,
)
