BEGIN {
    FS = ","
    commands = ""
}
{
    print "{\"jsonrpc\":\"2.0\",\"method\":\"eth_getBalance\",\"params\":[\""$1"\", \"latest\"],\"id\":1}"
}
