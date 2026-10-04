sub init()
    m.top.functionName = "loadMenu"
end sub

sub loadMenu()
    port = CreateObject("roMessagePort")
    request = CreateObject("roUrlTransfer")
    request.SetMessagePort(port)
    request.SetCertificatesFile("common:/certs/ca-bundle.crt")
    request.InitClientCertificates()
    request.AddHeader("Accept", "application/json")
    request.AddHeader("Cache-Control", "no-cache")
    request.EnableEncodings(true)
    request.SetUrl("https://www.bustersmarkets.com/api/deli-menu")
    failure = "Request could not start"
    if request.AsyncGetToString()
        event = Wait(12000, port)
        if Type(event) = "roUrlEvent"
            code = event.GetResponseCode()
            failure = "HTTP " + code.ToStr()
            if code < 0 then failure = "Transfer " + code.ToStr() + ": " + event.GetFailureReason()
            if code = 200
                data = ParseJson(event.GetString())
                failure = "Menu data format not recognized"
                if data = invalid then failure = "Website returned invalid JSON"
                if validMenu(data)
                    print "[Busters menu] OK: "; data.items.Count(); " items"
                    m.top.result = {ok: true, menu: data}
                    return
                end if
            end if
        else
            request.AsyncCancel()
            failure = "Request timed out after 12 seconds"
        end if
    end if
    print "[Busters menu] "; failure
    m.top.result = {ok: false, error: failure}
end sub

function validMenu(data as dynamic) as boolean
    if Type(data) <> "roAssociativeArray" then return false
    if Type(data.categories) <> "roArray" then return false
    if Type(data.items) <> "roArray" then return false
    for each cat in data.categories
        if Type(cat) <> "roAssociativeArray" then return false
        if not isText(cat.id) or not isText(cat.name) then return false
        if not isNumber(cat.order) then return false
    end for
    for each item in data.items
        if Type(item) <> "roAssociativeArray" then return false
        if not isText(item.categoryId) or not isText(item.name) then return false
        if not isNumber(item.price) then return false
        if item.price < 0 then return false
        if not isNumber(item.order) then return false
    end for
    return true
end function

function isNumber(value as dynamic) as boolean
    kind = Type(value)
    return kind = "roInt" or kind = "roInteger" or kind = "Integer" or kind = "roFloat" or kind = "Float" or kind = "roDouble" or kind = "Double" or kind = "roLongInteger" or kind = "LongInteger"
end function

function isText(value as dynamic) as boolean
    return Type(value) = "String" or Type(value) = "roString"
end function
