sub init()
    m.photo = m.top.FindNode("photo")
    m.fallback = m.top.FindNode("fallback")
    agent = CreateObject("roHttpAgent")
    agent.SetCertificatesFile("common:/certs/ca-bundle.crt")
    agent.InitClientCertificates()
    m.photo.SetHttpAgent(agent)
    m.photo.ObserveField("loadStatus", "photoState")
    layoutPhoto()
end sub

sub layoutPhoto()
    for each id in ["back", "fallback", "photo"]
        node = m.top.FindNode(id)
        node.width = m.top.photoWidth
        node.height = m.top.photoHeight
    end for
    m.photo.loadWidth = m.top.photoWidth
    m.photo.loadHeight = m.top.photoHeight
    m.fallback.text = "B."
    m.fallback.font.size = 48
    if m.top.large
        m.fallback.text = "Buster's" + Chr(10) + "Deli"
        m.fallback.font.size = 76
    end if
end sub

sub loadPhoto()
    m.photo.visible = false
    m.fallback.visible = true
    m.photo.uri = m.top.imageUrl
end sub

sub photoState()
    ready = m.photo.loadStatus = "ready"
    m.photo.visible = ready
    m.fallback.visible = not ready
    if m.photo.loadStatus = "failed" then print "[Busters photo] Could not load image; showing brand placeholder."
end sub
