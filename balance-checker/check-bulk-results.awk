BEGIN {
    FS = ":"
    jackpot = 0
    error = 0
}
{
    if (match($3, "error") == 0) {
        if ($4 != "0x0") {
            jackpot = 1
        }
    } else {
        error = 1
    }

}
END {
    if (error == 1) {
        print "error"
    }
    else if (jackpot == 1) {
        print "jackpot"
    }

}
