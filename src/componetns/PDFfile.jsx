import { Page, Text, Document, StyleSheet, Image, View } from "@react-pdf/renderer";

const PDFfile = ({ name, email, phone, address, signature }) => {
    const styles = StyleSheet.create({
        body: {
            paddingTop: 35,
            paddingBottom: 65,
            paddingHorizontal: 35,
        },
        title: {
            fontSize: 24,
            textAlign: "center",
            marginBottom: 20,
        },
        label: {
            fontSize: 14,
            marginBottom: 5,
        },
        text: {
            fontSize: 14,
            marginBottom: 20,
            lineHeight: 1.5,
        },
        signatureContainer: {
            position: "absolute",
            bottom: 35, // Adjust the distance from the bottom
            right: 35, // Adjust the distance from the right
        },
        signature: {
            height: "50px",
            width: "100px",
        }
    });

    return (
        <Document>
            <Page size='A4' style={styles.body}>
                <Text style={styles.title}>User Information</Text>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.text}>{name}</Text>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.text}>{email}</Text>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.text}>{phone}</Text>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.text}>{address}</Text>
                <View style={styles.signatureContainer}>
                    <Image style={styles.signature} src={signature} />
                </View>
            </Page>
        </Document>
    );
}

export default PDFfile;
