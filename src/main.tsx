import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {
    Accordion,
    AppShell,
    Badge,
    Button,
    createTheme,
    Input,
    MantineProvider,
    NumberInput,
    SegmentedControl, Textarea,
    TextInput
} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';
import classes from "./styles/basic-components.module.scss";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./store";
import {api} from "./store/api/api.ts";
import {Carousel} from "@mantine/carousel";
import {Calendar, DatesProvider, TimeInput} from "@mantine/dates";
import 'dayjs/locale/ru';

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
        }),
        Carousel: Carousel.extend({
            classNames: {
                viewport: classes.carouselViewport,
                controls: classes.carouselControls
            }
        }),
        Input: Input.extend({
            defaultProps: {
                size: 'xl'
            },
            classNames: {
                input: classes.input
            },
        }),
        Button: Button.extend({
            defaultProps: {
                size: 'xl',
                color: 'red'
            },
            classNames: {
                root: classes.button,
            }
        }),
        NumberInput: NumberInput.extend({
            classNames: {
                input: classes.numberInput
            }
        }),
        Accordion: Accordion.extend({
            classNames: {
                control: classes.accordionControl
            }
        }),
        TimeInput: TimeInput.extend({
            classNames: {
                input: classes.timeInput
            }
        }),
        Textarea: Textarea.extend({
            classNames: {
                input: classes.textarea
            }
        }),
        Calendar: Calendar.extend({
            classNames: {
                day: classes.calendarDay
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
        <DatesProvider settings={{locale: 'ru'}}>
            <MantineProvider theme={theme}>
                <Notifications/>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </MantineProvider>
        </DatesProvider>
    </Provider>
    ,
)
