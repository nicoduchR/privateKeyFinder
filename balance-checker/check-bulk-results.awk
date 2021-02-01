BEGIN {
    FS = ":"
    jackpot = 0
}
{
    if ($4 != "0x0") {
        jackpot = 1
    }
}
END {
    if (jackpot == 1) {
        print 1
    }
}
