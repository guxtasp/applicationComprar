import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#c0d2d8",
        paddingTop: 62,
    },
    logo:{
        height: 34,
        width: 134
    },
    forms:{
        width: "100%",
        paddingHorizontal:16,
        gap: 7,
        marginTop: 32,
    },
    content:{
        flex:1,
        width: "100%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingTop: 32,
        marginTop: 24,
    },
    headerContent:{
        flexDirection: "row",
        gap: 8,
        width: "100%",
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#E6E6E6",
    },
    clearButton:{
        marginLeft: "auto",
    },
    clearText:{
        fontSize: 14,
        color: "#828282",  
        fontWeight: 600,
    },
    separator:{
        width: "100%",
        height: 1,
        backgroundColor: "#EEF0F5",
        marginVertical: 16,
    },
    listContent:{
        paddingTop:24,
        paddingBottom: 62,
    },
    emptyText:{
        textAlign: "center",
        color: "#808080",
        fontSize: 14,
    }
}
);
