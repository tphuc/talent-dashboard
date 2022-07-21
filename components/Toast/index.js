import React, { useEffect } from "react";
import { keyframes, styled } from "stitches.config";

const slideIn = keyframes({
    from: { transform: `translateX(calc(100% + 20px))` },
    to: { transform: 'translateX(0)' },
});


const Ctx = React.createContext();

export const useToasts = () => React.useContext(Ctx);


const StyledToast = styled('div', {
    background: "$mauve1",
    cursor: "pointer",
    fontSize: 14,
    margin: 10,
    padding: '$3 $5',
    borderRadius:"$5",
    boxShadow: `0 2px 10px $colors$grayA7, 0 0 0 1px $colors$grayA7`,
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    animationFillMode: 'forwards',
    animationName: slideIn,
    
})

const StyledToastContainer = styled('div', { 
    position: "fixed", right: 0, top: 0, zIndex: 1000,
    variants: {
        variant: {
            white: {

            },
            error: {
                color:"$red10"
            },
            success: {
                color:"$violet10"
            }
        }
    },
    defaultVariants: {
        variant:"white"
    }
});





const Toast = ({ children, onDismiss, ...props }) => {


    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss();
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [onDismiss]);
    
    return <StyledToast
        onClick={onDismiss}
    >
        {children}
    </StyledToast>
};

// Provider
// ==============================

let toastCount = 0;

export function ToastProvider({ children }) {
    const [toasts, setToasts] = React.useState([]);
    const [toastOptions, setToastOptions] = React.useState({
        variant:"error"
    })

    const add = (content, options) => {
        const id = toastCount++;
        const toast = { content, id };
        setToastOptions(options)
        setToasts([...toasts, toast]);
    };
    const remove = id => {
        const newToasts = toasts.filter(t => t.id !== id);
        setToasts(newToasts);
    };
    // avoid creating a new fn on every render
    const onDismiss = id => () => remove(id);

    return (
        <Ctx.Provider value={{ add, remove }}>
            {children}
            <StyledToastContainer  {...toastOptions}>
                {toasts.map(({ content, id, ...rest }) => (
                    <Toast key={id} onDismiss={onDismiss(id)} {...rest}>
                        {content}
                    </Toast>
                ))}
            </StyledToastContainer>
        </Ctx.Provider>
    );
}

// Consumer
// ==============================


