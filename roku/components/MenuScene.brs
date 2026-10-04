sub init()
    configureFonts()
    m.top.backgroundColor = "#fff6e4"
    m.top.backgroundUri = ""
    m.content = m.top.FindNode("menuContent")
    m.message = m.top.FindNode("message")
    m.status = m.top.FindNode("status")
    m.pageLabel = m.top.FindNode("pageLabel")
    m.top.FindNode("spotlight").visible = false
    m.pages = []
    m.page = 0
    m.loaded = false
    m.paused = false
    m.lastMenu = ""
    m.task = CreateObject("roSGNode", "MenuFeed")
    m.task.ObserveField("result", "menuReceived")
    m.refresh = m.top.FindNode("refreshTimer")
    m.refresh.ObserveField("fire", "refreshMenu")
    m.refresh.control = "start"
    m.rotate = m.top.FindNode("pageTimer")
    m.rotate.ObserveField("fire", "nextPage")
    m.rotate.control = "start"
    m.top.SetFocus(true)
    refreshMenu()
end sub

sub refreshMenu()
    if m.task.state <> "run" then m.task.control = "RUN"
end sub

sub menuReceived()
    result = m.task.result
    if not result.ok
        if m.loaded
            m.status.text = "Last received menu. " + result.error + ". Retrying..."
        else
            m.message.text = "Unable to load menu: " + result.error + ". Retrying automatically..."
        end if
        return
    end if
    m.loaded = true
    m.status.text = "Ask your server about today's specials"
    encoded = FormatJson(result.menu)
    if encoded = m.lastMenu then return
    m.lastMenu = encoded
    m.pages = makePages(result.menu)
    if m.page >= m.pages.Count() then m.page = 0
    renderPage()
end sub


' Four readable rows per category page; every item remains reachable.
function makePages(menu as object) as object
    menu.categories.SortBy("order")
    menu.items.SortBy("order")
    pages = []
    for each cat in menu.categories
        rows = []
        for each item in menu.items
            if item.categoryId = cat.id then rows.Push(item)
        end for
        offset = 0
        while offset < rows.Count()
            chunk = []
            for index = offset to offset + 3
                if index < rows.Count() then chunk.Push(rows[index])
            end for
            heading = cat.name
            if offset > 0 then heading = heading + " (continued)"
            pages.Push({heading: heading, items: chunk})
            offset = offset + 4
        end while
    end for
    return pages
end function

function photoUrl(value as dynamic) as string
    if Type(value) <> "String" and Type(value) <> "roString" then return ""
    value = value.Trim()
    lower = LCase(value)
    if Left(lower, 8) = "https://" or Left(lower, 7) = "http://" then return value
    if Left(value, 2) = "//" then return "https:" + value
    if Left(value, 1) = "/" then return "https://www.bustersmarkets.com" + value
    return ""
end function

sub renderPage()
    m.content.RemoveChildrenIndex(m.content.GetChildCount(), 0)
    m.message.visible = m.pages.Count() = 0
    m.top.FindNode("spotlight").visible = m.pages.Count() > 0
    if m.pages.Count() = 0
        m.top.FindNode("category").text = "Today's menu"
        m.message.text = "The menu is being prepared." + Chr(10) + "Please ask at the deli counter."
        m.pageLabel.text = ""
        return
    end if
    page = m.pages[m.page]
    m.top.FindNode("category").text = page.heading
    rowIndex = 0
    hero = invalid
    ' Prefer an available featured item with a photo, then any available photo.
    for each item in page.items
        if item.soldOut <> true and photoUrl(item.image) <> ""
            if hero = invalid then hero = item
            if item.featured = true
                hero = item
                exit for
            end if
        end if
    end for
    if hero = invalid
        for each item in page.items
            if item.soldOut <> true
                hero = item
                exit for
            end if
        end for
    end if
    if hero = invalid then hero = page.items[0]
    for each item in page.items
        y = rowIndex * 156
        photo = m.content.CreateChild("FoodPhoto")
        photo.translation = [0, y]
        photo.photoWidth = 136
        photo.photoHeight = 136
        photo.imageUrl = photoUrl(item.image)
        price = money(item.price)
        color = "#35181d"
        if item.soldOut = true
            price = "Sold out"
            color = "#786960"
            photo.opacity = 0.5
        end if
        addLabel(m.content, item.name, 160, y + 2, 676, 84, 34, color, true, true)
        priceNode = addLabel(m.content, price, 840, y + 2, 256, 54, 36, "#a9152d", false, true)
        priceNode.horizAlign = "right"
        detail = ""
        if Type(item.description) = "String" or Type(item.description) = "roString" then detail = item.description
        if item.featured = true and item.soldOut <> true then detail = "Today's pick  /  " + detail
        addLabel(m.content, detail, 160, y + 88, 936, 40, 25, "#66534a", false, false)
        if rowIndex < page.items.Count() - 1
            rule = m.content.CreateChild("Rectangle")
            rule.translation = [160, y + 144]
            rule.width = 936
            rule.height = 1
            rule.color = "#d7c6ac"
        end if
        rowIndex = rowIndex + 1
    end for
    m.top.FindNode("heroPhoto").imageUrl = photoUrl(hero.image)
    m.top.FindNode("heroName").text = hero.name
    m.top.FindNode("heroPrice").text = money(hero.price)
    m.top.FindNode("heroKicker").text = "On the menu"
    if hero.featured = true then m.top.FindNode("heroKicker").text = "Today's pick"
    if hero.soldOut = true
        m.top.FindNode("heroKicker").text = "Back another day"
        m.top.FindNode("heroPrice").text = "Sold out today"
    end if
    m.pageLabel.text = "Menu " + (m.page + 1).ToStr() + " of " + m.pages.Count().ToStr()
    if m.paused then m.pageLabel.text = m.pageLabel.text + "  |  Paused"
end sub

function addLabel(parent as object, text as string, x as integer, y as integer, width as integer, height as integer, size as integer, color as string, wrap as boolean, bold as boolean) as object
    label = parent.CreateChild("Label")
    label.translation = [x, y]
    label.width = width
    label.height = height
    label.text = text
    label.color = color
    label.wrap = wrap
    label.maxLines = 2
    label.font = "font:MediumSystemFont"
    if bold then label.font = "font:MediumBoldSystemFont"
    label.font.size = size
    return label
end function

function money(value as dynamic) as string
    cents = Int(value * 100 + 0.5)
    whole = Int(cents / 100)
    fraction = cents mod 100
    tail = fraction.ToStr()
    if fraction < 10 then tail = "0" + tail
    return "$" + whole.ToStr() + "." + tail
end function

sub nextPage()
    if m.pages.Count() < 2 then return
    m.page = (m.page + 1) mod m.pages.Count()
    renderPage()
end sub

function onKeyEvent(key as string, press as boolean) as boolean
    if not press then return false
    if key = "right" or key = "left"
        if m.pages.Count() > 0
            direction = 1
            if key = "left" then direction = -1
            m.page = (m.page + direction + m.pages.Count()) mod m.pages.Count()
            renderPage()
            m.rotate.control = "stop"
            if not m.paused then m.rotate.control = "start"
        end if
        return true
    else if key = "OK" or key = "play"
        m.paused = not m.paused
        m.rotate.control = "stop"
        if not m.paused then m.rotate.control = "start"
        renderPage()
        return true
    end if
    return false
end function

sub configureFonts()
    sizes = {brand: 76, strap: 28, today: 38, category: 48, message: 38, status: 24, pageLabel: 24, heroKicker: 26, heroName: 42, heroPrice: 44}
    for each id in sizes
        m.top.FindNode(id).font.size = sizes[id]
    end for
end sub
