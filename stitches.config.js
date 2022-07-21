import { createStitches } from '@stitches/react';
import {
    gray,
    blue,
    red,
    green,
    purple,
    violet,
    orange,
    blackA,
    mauve,
    whiteA,
    grayA,
    redA,
    tomato,
    violetA,
    orangeA
} from '@radix-ui/colors';




export const { styled, getCssText, keyframes, globalCss } = createStitches({
    media: {
        mobile:'(min-width: 480px)',
        bp1: '(min-width: 640px)',
        bp2: '(min-width: 768px)',
        bp3: '(min-width: 1024px)',
      },
    theme: {
        colors: {
            violet100: '#decafe',
            violet200: '#c8a8fd',
            violet300: '#ab7bfc',
            violet400: '#9563e8',
            violet500: '#8357cc',
            violet600: '#744eb5',
            violet700: '#6846a3',
            violet800: '#5f3f94',
            violet900: '#563986',

            orange100: '#fac9a5',
            orange200: '#f7a468',
            orange300: '#e07a31',
            orange400: '#c0682a',
            orange500: '#a85b24',
            orange600: '#955120',
            orange700: '#87491d',
            orange800: '#7a421a',
            orange900: '#6e3c18',

            gray100: '#efefef',
            gray200: '#e9e9e9',
            gray300: '#c5c5c5',
            gray400: '#a5a5a4',
            gray500: '#878686',
            gray600: '#6d6c6c',
            gray700: '#565555',
            gray800: '#424241',
            gray900: '#272626',

            slate100: 'hsl(200 6% 9.6%)',
            slate200: 'hsl(201 6% 11.6%)',
            slate300: 'hsl(201 6% 13.9%)',
            slate400: 'hsl(202 6% 16.6%)',
            slate500: 'hsl(202 6% 20.1%)',
            slate600: 'hsl(203 6% 24.8%)',
            slate700: 'hsl(204 6% 31.0%)',
            slate800: 'hsl(206 6% 43.9%)',
            slate900: 'hsl(205 5% 52.9%)',
            slate1000: 'hsl(210 3% 93%)',


            hiContrast: 'hsl(200 12% 5%)',
            loContrast: 'white',
            canvas: 'hsl(0 0% 93%)',
            panel: 'white',
            transparentPanel: 'hsl(0 0% 0% / 97%)',
            shadowLight: 'hsl(206 22% 7% / 35%)',
            shadowDark: 'hsl(206 22% 7% / 20%)',


            ...gray,
            ...blue,
            ...red,
            ...redA,
            ...green,
            ...violet,
            ...purple,
            ...blackA,
            ...whiteA,
            ...grayA,
            ...orange,
            ...orangeA,
            ...violetA,
            ...mauve
        },
        fonts: {
            sans: 'Inter, sans-serif',
        },
        space: {
            1: '5px',
            2: '10px',
            3: '15px',
            4: '20px',
            5: '25px',
            6: '35px',
            7: '45px',
            8: '65px',
            9: '80px',
        },
        sizes: {
            1: '5px',
            2: '10px',
            3: '15px',
            4: '20px',
            5: '25px',
            6: '35px',
            7: '45px',
            8: '65px',
            9: '80px',
        },
        fontSizes: {
            1: '12px',
            2: '13px',
            3: '15px',
            4: '17px',
            5: '19px',
            6: '21px',
            7: '27px',
            8: '35px',
            9: '59px',
        },
        radii: {
            1: '3px',
            2: '5px',
            3: '7px',
            4: '10px',
            5: '14px',
            round: '50%',
            pill: '9999px',
        },
        fontWeights: {},
        lineHeights: {},
        letterSpacings: {},
        borderWidths: {},
        borderStyles: {},
        shadows: {},
        zIndices: {},
        transitions: {},
    },
    utils: {
        p: (value) => ({
            paddingTop: value,
            paddingBottom: value,
            paddingLeft: value,
            paddingRight: value,
        }),
        pt: (value) => ({
            paddingTop: value,
        }),
        pr: (value) => ({
            paddingRight: value,
        }),
        pb: (value) => ({
            paddingBottom: value,
        }),
        pl: (value) => ({
            paddingLeft: value,
        }),
        px: (value) => ({
            paddingLeft: value,
            paddingRight: value,
        }),
        py: (value) => ({
            paddingTop: value,
            paddingBottom: value,
        }),

        m: (value) => ({
            marginTop: value,
            marginBottom: value,
            marginLeft: value,
            marginRight: value,
        }),
        mt: (value) => ({
            marginTop: value,
        }),
        mr: (value) => ({
            marginRight: value,
        }),
        mb: (value) => ({
            marginBottom: value,
        }),
        ml: (value) => ({
            marginLeft: value,
        }),
        mx: (value) => ({
            marginLeft: value,
            marginRight: value,
        }),
        my: (value) => ({
            marginTop: value,
            marginBottom: value,
        }),

        ta: (value) => ({ textAlign: value }),

        fd: (value) => ({ flexDirection: value }),
        fw: (value) => ({ flexWrap: value }),

        ai: (value) => ({ alignItems: value }),
        ac: (value) => ({ alignContent: value }),
        jc: (value) => ({ justifyContent: value }),
        as: (value) => ({ alignSelf: value }),
        fg: (value) => ({ flexGrow: value }),
        fs: (value) => ({ flexShrink: value }),
        fb: (value) => ({ flexBasis: value }),

        bc: (value) => ({
            backgroundColor: value,
        }),

        br: (value) => ({
            borderRadius: value,
        }),
        btrr: (value) => ({
            borderTopRightRadius: value,
        }),
        bbrr: (value) => ({
            borderBottomRightRadius: value,
        }),
        bblr: (value) => ({
            borderBottomLeftRadius: value,
        }),
        btlr: (value) => ({
            borderTopLeftRadius: value,
        }),

        bs: (value) => ({ boxShadow: value }),

        lh: (value) => ({ lineHeight: value }),

        ox: (value) => ({ overflowX: value }),
        oy: (value) => ({ overflowY: value }),

        pe: (value) => ({ pointerEvents: value }),
        us: (value) => ({ WebkitUserSelect: value, userSelect: value }),

        size: (value) => ({
            width: value,
            height: value,
        }),

        linearGradient: (value) => ({
            backgroundImage: `linear-gradient(${value})`,
        }),

        appearance: (value) => ({
            WebkitAppearance: value,
            appearance: value,
        }),
        userSelect: (value) => ({
            WebkitUserSelect: value,
            userSelect: value,
        }),
        backgroundClip: (value) => ({
            WebkitBackgroundClip: value,
            backgroundClip: value,
        }),
    },

});


