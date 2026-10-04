sub Main()
    menu = ParseJson("{""categories"":[{""id"":""c"",""name"":""Subs"",""order"":0}],""items"":[]}")
    check(validMenu(menu), "JSON string types accepted")
    check(makePages(menu).Count() = 0, "empty categories omitted")
    for i = 0 to 8
        menu.items.Push({categoryId: "c", name: "Sub", order: i, price: 7.5, image: "https://example.com/food.png"})
    end for
    pages = makePages(menu)
    check(pages.Count() = 3, "nine items produce three pages")
    check(pages[0].items.Count() = 4, "four items on first page")
    check(pages[2].items.Count() = 1, "last item retained")
    check(pages[2].items[0].order = 8, "ordering preserved")
    check(pages[1].heading = "Subs (continued)", "continuation labeled")
    check(photoUrl("  https://example.com/food.jpg?token=abc  ") = "https://example.com/food.jpg?token=abc", "signed URLs preserved")
    check(photoUrl("/food.jpg") = "https://www.bustersmarkets.com/food.jpg", "relative photos supported")
    check(photoUrl("//example.com/food.png") = "https://example.com/food.png", "protocol-relative photos supported")
    check(photoUrl(invalid) = "", "missing photos safe")
    check(photoUrl(15) = "", "malformed photo types safe")
    check(photoUrl("javascript:alert(1)") = "", "unsupported schemes rejected")
    check(money(7.5) = "$7.50", "currency decimals")
    check(money(0) = "$0.00", "zero price")
    check(not validMenu({categories: [], items: [{name: "bad"}]}), "invalid menu rejected")
    print "All menu logic tests passed."
end sub
sub check(condition as boolean, description as string)
    if not condition
        print "FAIL: "; description
        stop
    end if
    print "PASS: "; description
end sub
