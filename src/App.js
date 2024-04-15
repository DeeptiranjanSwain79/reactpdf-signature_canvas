import { Box, Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { BlobProvider, PDFDownloadLink, PDFViewer, pdf, usePDF } from "@react-pdf/renderer";
import PDFfile from "./componetns/PDFfile";
import SignatureCanvas from "react-signature-canvas";
import axios from "axios";


function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const [sign, setSign] = useState()
  const [url, setUrl] = useState('')
  const [blobpdf, setBlobpdf] = useState();

  const [showDownloadButton, setShowDownloadButton] = useState(false);

  // console.log("iubhikmkjnbhbjkinstance", instance)

  const blobToBase64 = blob => {
    var reader = new FileReader();
    reader.onload = function () {
      var dataUrl = reader.result;
      var base64 = dataUrl.split(',')[1];
    };
    reader.readAsDataURL(blob);
  };
  
  const handleSubmit = async () => {
    if (name.length > 0 && phone.length > 0 && email.length > 0 && address.length > 0) {
      const blob = await pdf(<PDFfile name={name} email={email} phone={phone} address={address} signature={url} />).toBlob();

      const reader = new FileReader();
      reader.onloadend = function () {
        const base64String = reader.result;
        console.log('Base64 String - ', base64String);

        const formData = new FormData();
        formData.append('pdfFile', blob);

        // Append base64 string to FormData
        formData.append('base64String', base64String);

        // Send FormData to backend
        axios.post('http://localhost:3500/post', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }).then(response => {
          console.log(response);
          setShowDownloadButton(true);
        }).catch(error => {
          console.error('Error uploading file:', error);
          // Handle error
        });
      };
      reader.readAsDataURL(blob);
    } else {
      window.alert("Please fill all required fields");
    }
  };

  const handleClear = () => {
    sign.clear()
    setUrl('')
  }
  const handleGenerate = () => {
    setUrl(sign.getTrimmedCanvas().toDataURL('image/png'))
  }
  return (
    <Box>
      {/* Form to take user Input */}
      <Stack gap={2} sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "70%", margin: 'auto' }}>
        <TextField
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
          label="Name"
          required
        />
        <TextField
          value={phone}
          onChange={e => setPhone(e.target.value)}
          fullWidth
          label="Phone"
          required
        />
        <TextField
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
          label="Email"
          required
        />
        <TextField
          value={address}
          onChange={e => setAddress(e.target.value)}
          fullWidth
          label="Address"
          required
        />

        <Box>
          <Box sx={{ border: "1px solid black", height: "20vh", width: "100%" }}>
            <SignatureCanvas
              canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
              ref={data => setSign(data)}
            />
          </Box>

          <Button onClick={handleClear}>Clear</Button>
          <Button onClick={handleGenerate}>Save</Button>
        </Box>

        <Button onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>

      {/* {
        showDownloadButton &&
        <PDFDownloadLink document={<PDFfile name={name} email={email} phone={phone} address={address} signature={url} />} fileName="FORM.pdf">
          {({ blob, url, loading, error }) => {
            if (loading) {
              return "Loading document...";
            } else if (url && blob) {
              return <Button>Download PDF</Button>;
            } else {
              return "Error generating PDF.";
            }
          }}
        </PDFDownloadLink>
      } */}

      {/* {
        name.length > 0 && email.length > 0 && phone.length > 0 && address.length > 0 && url.length > 0 &&
        <PDFViewer height={'1000px'} width={'100%'}>
          <PDFfile name={name} email={email} phone={phone} address={address} signature={url} />
        </PDFViewer>
      } */}

      {/* {
        name.length > 0 && email.length > 0 && phone.length > 0 && address.length > 0 && url.length > 0 &&
        <BlobProvider document={<PDFfile name={name} email={email} phone={phone} address={address} signature={url} />}>
          {async ({ blob, url, loading, error }) => {
            if (loading) {
              return "Loading document...";
            } else if (url && blob) {

              // Create FormData
              const formData = new FormData();
              // formData.append('pdfFile', instance.blob, 'user_information.pdf');
              formData.append('pdfFile', blob, 'user_information.pdf');
              console.log(formData);
              const response = await axios.post('http://localhost:3500/post', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
              console.log(response)
              return <Button>Download PDF</Button>;
            } else {
              return "Error generating PDF.";
            }
          }}
        </BlobProvider>
      } */}
    </Box>
  );
}

export default App;
