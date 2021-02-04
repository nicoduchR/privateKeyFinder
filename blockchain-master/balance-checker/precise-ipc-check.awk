BEGIN {
    FS = ","
}

{
    ("echo '{\"jsonrpc\":\"2.0\",\"method\":\"eth_getBalance\",\"params\":[\""$1"\", \"latest\"],\"id\":1}' | netcat -U -N "ipc_file "") | getline response
    len = split(response, s_response, ":")
    gsub("{","",s_response[len])
    gsub("}","",s_response[len])
    gsub("\"","",s_response[len])
    if (s_response[len] != "0x0") {
        print $0 "," s_response[len]
    }
    
}