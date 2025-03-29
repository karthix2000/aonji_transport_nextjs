 
 "use client";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";






import { Image } from "@react-pdf/renderer";


interface Agency {
    name: string;
    phone: string;
    address: string;
  }
  
  interface Consigner {
    name: string;
    phone: string;
    address: string;
  }
  
  interface Consignee {
    name: string;
    Phone: string;
    numOfParcels: number;
    type: string;
    amount: number;
    address: string;
  }
  
  interface Bill {
    id: string;
    lrNumber: number;
    date: string;
    to: string;
    agency: Agency;
    totalNumOfParcels: number;
    totalAmount: number;
    paymentStatus: boolean;
    deliveryStatus: boolean;
    consigner: Consigner;
    consignees: Consignee[];
  }
  
  interface PDFDocumentProps {
    bill: Bill;
  }

 
 

const styles = StyleSheet.create({
 
    container: {
     
      borderRadius: 6,
      padding: 1,
      marginBottom: 2,
      
  
    },
    page: {
      backgroundColor: "#ffffff",
      padding: 10,
      width: 595,
      height: 842, // Full A4 size to fit two half A4 bills
      
    },
    billContainer: {
      height: 390, // Half A4 size
      borderBottom: "1 solid #4c4c4c",
      border:"1 solid #757575",
      marginVertical:12,
      borderRadius:5
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      borderBottom: "1 solid #ccc",
      paddingBottom: 3,
    },
    titleBox: {
      backgroundColor: "#1e293b",
      padding: 2,
      borderRadius: 6,
      color: "white",
      textAlign: "center",
      fontFamily:"Helvetica-Bold"
    },
    details: {
      fontSize: 10,
      color: "#333",
    },
    headerDetails: {
      fontSize: 8,
      fontFamily:"Helvetica-Bold",
      color: "#333",
    },
    section: {
      marginVertical: 3,
      padding: 5,
      border: "1 solid #ddd",
      borderRadius: 4,
    },
    dateSection:{
      flexDirection:"row",
      justifyContent:"space-between",
      marginHorizontal:4
    },
    shippingDetailsSection:{
      
      flexDirection: "row",
      justifyContent:  "space-between",
      padding: 5,
      border: "1 solid #ddd",
      borderRadius: 4,
      fontSize:10
     
    },
    
  
    table: {
      marginTop: 5,
    },
    tableRow: {
      flexDirection: "row",
      borderBottom: "1 solid #ddd",
     
      justifyContent:"space-evenly"
    },
    tableCellHeader: {
      fontFamily:"Helvetica-Bold",
      fontSize: 8,
      flex: 1,
      backgroundColor:"#3f3f3f",
      color:"white",
      padding:4
    },
    tableCell: {
      fontSize: 8,
      flex: 1,
      paddingHorizontal:4,
      paddingVertical:1
    },
    title: {
      fontSize: 16,
      fontFamily: "Helvetica-Bold",
    }
  });















const PDFDocument: React.FC<PDFDocumentProps> = ({ bill }) =>{
    const date = new Date().toLocaleDateString("hi-IN");
    
  return  (
    <Document>

      <Page  size={"A4"} style={styles.page}>
        {[0,1].map((_,index)=>(
            <View key={index} style={styles.billContainer} >
 {/* Header Section */}
 <View style={styles.container}>
          <View style={styles.header}>
            {/* Group 1 */}
            
              <Image style={{width:"6%",height:"auto"}} src="/hanumanlogo.png" />
          
            {/* Group 2 */}
            <View style={{backgroundColor:"#282828",padding:2,textAlign:"center",flexDirection:"column",justifyContent:"center",alignContent:"center",borderRadius:4 }} >
              <Text style={[styles.title,{fontSize:32,letterSpacing:4,color:"white",display:"flex",alignSelf:"center",left:1}]}>AONJI</Text>
              <Text style={[styles.title,{fontSize:8,letterSpacing:8,color:"white",display:"flex",alignSelf:"center",left:1}]} >TRANSPORT</Text>
            </View>
             
            
            {/* Group 3 */}
            <View  >
            <Text style={styles.headerDetails}>GST: jksdfujowieefiu</Text>
              <Text style={styles.headerDetails}>Near New RTC Bus Stand,</Text>
              <Text style={styles.headerDetails}>Proddatur, Kadapa Dist., 516360.</Text>
              <Text style={styles.headerDetails}>Phone: 9898989898</Text>
            </View>
            {/* Group 4 */}
            <View>
            <Text style={styles.headerDetails }>Our Services In:</Text>
              <Text style={styles.headerDetails}>Anantapur</Text>
              <Text style={styles.headerDetails}>Kadapa</Text>
              <Text style={styles.headerDetails}>Kurnool</Text>
              
            </View>
            {/* Group 5 */}
            
            <Image style={{width:"12%",}} src="/pdfLogo.png" />
            
          </View>
        </View>

        {/* Bill Info */}
        <View style={[styles.dateSection,{fontFamily:"Courier-Bold",color:"black"}]}>
          <Text style={styles.details}>LR NO.: {bill.id}</Text>
          <Text style={styles.details}>DATE: {date}</Text>
        </View>

        {/* Shipping Details */}
        <View style={styles.shippingDetailsSection} >
        <View style={{fontFamily:"Courier-Bold",color:"black"}} >
          <Text style={styles.details}>From: Proddatur</Text>
          <Text style={styles.details}>Phone: 9898989898</Text>
          <Text style={styles.details}>Total Lot: {bill.totalNumOfParcels} </Text>

        </View>

        <View style={{fontFamily:"Courier-Bold",color:"black"}} >
          <Text style={styles.details}>To: {bill.to}</Text>
          <Text style={styles.details}>Agency: {bill.agency.name}</Text>
          <Text style={styles.details}>Address: {bill.agency.address}</Text>
          <Text style={styles.details}>Phone: {bill.agency.phone}</Text>
        </View>

        <View style={{fontFamily:"Courier-Bold",color:"black"}} >
          <Text style={styles.details}>Consigner: {bill.consigner.name}</Text>
          <Text style={styles.details}>Phone: {bill.consigner.phone}</Text>
          <Text style={styles.details}>Address: {bill.consigner.address}</Text>
          <Text style={{ fontWeight: "bold", fontSize: 12 }}>
            Total Amount: Rs. {bill.totalAmount}/- {bill.paymentStatus ? "Paid" : "To Pay"}
          </Text>
        </View>
        </View>
      
      

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader,{flex:.2}] }>NO.</Text>
            <Text style={styles.tableCellHeader}>Consignee</Text>
            <Text style={styles.tableCellHeader}>Phone</Text>
            <Text style={[styles.tableCellHeader,{flex:.3}]}>Lot</Text>
            <Text style={styles.tableCellHeader}>Type</Text>
            <Text style={[styles.tableCellHeader,{flex:.6}]}>Amount</Text>
            <Text style={[styles.tableCellHeader,{flex:1.6}]}>Address</Text>
          </View>

          {bill.consignees.map((item, index) => (
            <View  key={index} style={[styles.tableRow,{fontFamily:"Courier-Bold",color:"black",fontWeight:"bold"}]}>
              <Text style={[styles.tableCell,{flex:.2}]}>{index + 1}</Text>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.Phone}</Text>
              <Text style={[styles.tableCell,{flex:.3}]}>{item.numOfParcels}</Text>
              <Text style={styles.tableCell}>{item.type}</Text>
              <Text style={[styles.tableCell,{flex:.6}]}>Rs. {item.amount}</Text>
              <Text style={[styles.tableCell,{flex:1.6}]}>{item.address}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.details,{flexDirection:"row",justifyContent:"space-between",padding:4,margin:2,fontFamily:"Helvetica-Bold",fontSize:8,marginTop:20}]} >
          <Text style={{marginLeft:5}} >Signature of Biller with stamp</Text>
          <Text style={{marginLeft:5}} >Signature of Consigner</Text>
          <Text style={{marginRight:5}} >Signature of Consignee</Text>
        </View>
        <View style={{padding:4,color:"#484848",fontSize:10,fontFamily:"Helvetica",textAlign:"left",marginTop:15}} >
          <Text >Thank you for choosing us for your package transport needs. We assure you that your packages will reach safely, securely, and on time.</Text>
          <Text style={{color:"#686868",fontSize:10,fontFamily:"Helvetica",textAlign:"left"}} >Note: Report undelivered packages within 3 months. We are not responsible afterward.</Text>
        </View>
       
            </View>
        ))}
       
      </Page>
      
    </Document>

    

  );
}

  export default PDFDocument