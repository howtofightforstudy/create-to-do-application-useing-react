const alertStyle={
    padding: "16px",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: 400,
};

const severityStyles={
    warning: {
        color: "#664d03",
        background: "#fff3cd",
    },
};

const Alert=() => {
    const alert= {
        text: '⚠️ There is a line limit, please write carefully',
        type: 'warning'
    }
    

    const fullStyles={
        ...alertStyle,
        ...severityStyles[alert.type],
    }
    
    return <div style={fullStyles}>{alert.text}</div> 
}
  
  export default Alert;