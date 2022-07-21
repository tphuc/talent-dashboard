import { styled } from '@stitches/react';
import { Box } from 'components/Box';
import Button from 'components/Button';
import React from 'react';
import { RiUpload2Line } from 'react-icons/ri';
import truncate from 'truncate';


// const Button = styled('button', {
//     all: 'unset',
//     display: 'inline-flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: '$4',
//     padding: '0px $2',
//     fontSize: '$3',
//     height: '$6',
//     lineHeight: 'normal',
//     fontWeight: 400,
//     userSelect: "none",
//     // boxShadow: `0 2px 10px $colors$blackA3`,
//     transition: "0.2s ease all",
//     cursor: "pointer",
//     boxSizing: "border-box",
//     fontSize: '$3',
//     padding: '0 $2',
//     height: '$6',
//     backgroundColor: '$grayA3',
//     '&:hover': {
//         backgroundColor: '$grayA4',
//     },
//     '&:focus': { boxShadow: `0 0 0 2px $colors$grayA7` },
// })
/* Insert your favorite CSS code to style a button */

const SingleFileUploader = ({onChange = (file) => {}, accept='*', preview, css,imageStyle, initFile, placeholder='upload file', ...props}) => {
    const hiddenFileInput = React.useRef(null);
    const [file, setFile] = React.useState(initFile)

    const handleClick = event => {
        event.preventDefault()
        hiddenFileInput.current.click();
    };
    const _handleChange = event => {
        event.preventDefault()
        const fileUploaded = event.target.files[0];
        setFile(fileUploaded)
        onChange(fileUploaded);
    };
    // console.log(file)
    return (
        <Box css={{display:"flex", flexDirection:"column", alignItems:"flex-start", ...css}}>
            <div style={{display:"flex", alignItems:"center", width:"100%", gap:5}}>
            <Button css={{color: file ? "$violet10" :"$mauve12", width:"100%"}} onClick={handleClick}>
                <span style={{marginRight:5, whiteSpace:"nowrap"}}>{file ? truncate(file?.name, 15) : placeholder}</span>
                <RiUpload2Line/>
            </Button>
            <Button onClick={handleClick} variant='violetAlt'>Browse</Button>
            {file && <Button onClick={() => setFile(null)} variant='violet' >Clear</Button>}
            </div>
            <input type="file"
                accept={accept}
                ref={hiddenFileInput}
                onChange={_handleChange}
                style={{ display: 'none' }}
            />
            <div style={{display:"flex", width:"100%", justifyContent:"center", alignItems:"center"}}>
            { preview && file && <img style={{width:100, marginTop:5, height:100, borderRadius:10, border:"none",  objectFit:"cover", ...imageStyle}} alt='' src={URL.createObjectURL(file)}/>}
            </div>
        </Box>
    );
};
export default SingleFileUploader;