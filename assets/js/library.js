/* Lua2Gui UI Library Hub: original starter templates, no runtime execution. */
(function(){
  'use strict';
  const items=[
    {id:'glass-panel',name:'Modern glass panel',category:'panels',icon:'▧',description:'A centered dark panel with rounded corners, accent stroke, title, and subtitle.',code:`local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "ModernPanel"
ScreenGui.Parent = game.Players.LocalPlayer:WaitForChild("PlayerGui")

local Panel = Instance.new("Frame")
Panel.Name = "Panel"
Panel.Size = UDim2.fromOffset(420, 260)
Panel.Position = UDim2.fromScale(0.5, 0.5)
Panel.AnchorPoint = Vector2.new(0.5, 0.5)
Panel.BackgroundColor3 = Color3.fromRGB(18, 28, 24)
Panel.BorderSizePixel = 0
Panel.Parent = ScreenGui

local Corner = Instance.new("UICorner")
Corner.CornerRadius = UDim.new(0, 18)
Corner.Parent = Panel

local Stroke = Instance.new("UIStroke")
Stroke.Color = Color3.fromRGB(65, 190, 125)
Stroke.Thickness = 1.5
Stroke.Parent = Panel

local Title = Instance.new("TextLabel")
Title.Name = "Title"
Title.Size = UDim2.new(1, -36, 0, 44)
Title.Position = UDim2.fromOffset(18, 18)
Title.BackgroundTransparency = 1
Title.Text = "Control Center"
Title.TextColor3 = Color3.fromRGB(240, 248, 242)
Title.TextSize = 25
Title.Font = Enum.Font.GothamBold
Title.TextXAlignment = Enum.TextXAlignment.Left
Title.Parent = Panel

local Subtitle = Instance.new("TextLabel")
Subtitle.Name = "Subtitle"
Subtitle.Size = UDim2.new(1, -36, 0, 34)
Subtitle.Position = UDim2.fromOffset(18, 65)
Subtitle.BackgroundTransparency = 1
Subtitle.Text = "Manage your experience"
Subtitle.TextColor3 = Color3.fromRGB(160, 190, 170)
Subtitle.TextSize = 14
Subtitle.Font = Enum.Font.Gotham
Subtitle.TextXAlignment = Enum.TextXAlignment.Left
Subtitle.Parent = Panel`},
    {id:'action-button',name:'Action button',category:'controls',icon:'▣',description:'A clean rounded button with a matching UIStroke and readable label.',code:`local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "ActionButtonDemo"
ScreenGui.Parent = game.Players.LocalPlayer:WaitForChild("PlayerGui")

local Button = Instance.new("TextButton")
Button.Name = "ActionButton"
Button.Size = UDim2.fromOffset(190, 48)
Button.Position = UDim2.fromOffset(24, 24)
Button.BackgroundColor3 = Color3.fromRGB(48, 170, 105)
Button.BorderSizePixel = 0
Button.Text = "Continue"
Button.TextColor3 = Color3.fromRGB(255, 255, 255)
Button.TextSize = 17
Button.Font = Enum.Font.GothamBold
Button.Parent = ScreenGui

local Corner = Instance.new("UICorner")
Corner.CornerRadius = UDim.new(0, 12)
Corner.Parent = Button

local Stroke = Instance.new("UIStroke")
Stroke.Color = Color3.fromRGB(115, 230, 160)
Stroke.Thickness = 1
Stroke.Parent = Button`},
    {id:'settings-row',name:'Settings row',category:'controls',icon:'☷',description:'A reusable settings row with a title, description, and toggle-style visual.',code:`local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "SettingsRowDemo"
ScreenGui.Parent = game.Players.LocalPlayer:WaitForChild("PlayerGui")

local Row = Instance.new("Frame")
Row.Name = "SettingsRow"
Row.Size = UDim2.fromOffset(360, 76)
Row.Position = UDim2.fromOffset(20, 20)
Row.BackgroundColor3 = Color3.fromRGB(22, 31, 26)
Row.BorderSizePixel = 0
Row.Parent = ScreenGui

local Corner = Instance.new("UICorner")
Corner.CornerRadius = UDim.new(0, 12)
Corner.Parent = Row

local Title = Instance.new("TextLabel")
Title.Name = "SettingTitle"
Title.Size = UDim2.new(1, -100, 0, 28)
Title.Position = UDim2.fromOffset(14, 10)
Title.BackgroundTransparency = 1
Title.Text = "Enable notifications"
Title.TextColor3 = Color3.fromRGB(240, 245, 240)
Title.TextSize = 15
Title.Font = Enum.Font.GothamBold
Title.TextXAlignment = Enum.TextXAlignment.Left
Title.Parent = Row

local Description = Instance.new("TextLabel")
Description.Name = "Description"
Description.Size = UDim2.new(1, -100, 0, 22)
Description.Position = UDim2.fromOffset(14, 39)
Description.BackgroundTransparency = 1
Description.Text = "Receive useful updates"
Description.TextColor3 = Color3.fromRGB(155, 175, 160)
Description.TextSize = 12
Description.Font = Enum.Font.Gotham
Description.TextXAlignment = Enum.TextXAlignment.Left
Description.Parent = Row

local Toggle = Instance.new("Frame")
Toggle.Name = "Toggle"
Toggle.Size = UDim2.fromOffset(42, 24)
Toggle.Position = UDim2.new(1, -58, 0.5, -12)
Toggle.BackgroundColor3 = Color3.fromRGB(48, 170, 105)
Toggle.BorderSizePixel = 0
Toggle.Parent = Row

local ToggleCorner = Instance.new("UICorner")
ToggleCorner.CornerRadius = UDim.new(1, 0)
ToggleCorner.Parent = Toggle`},
    {id:'notification',name:'Notification toast',category:'feedback',icon:'▤',description:'A compact status notification with title, message, and accent edge.',code:`local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "NotificationDemo"
ScreenGui.Parent = game.Players.LocalPlayer:WaitForChild("PlayerGui")

local Toast = Instance.new("Frame")
Toast.Name = "Notification"
Toast.Size = UDim2.fromOffset(330, 94)
Toast.Position = UDim2.new(1, -350, 0, 24)
Toast.BackgroundColor3 = Color3.fromRGB(20, 30, 24)
Toast.BorderSizePixel = 0
Toast.Parent = ScreenGui

local Corner = Instance.new("UICorner")
Corner.CornerRadius = UDim.new(0, 13)
Corner.Parent = Toast

local Accent = Instance.new("Frame")
Accent.Name = "Accent"
Accent.Size = UDim2.fromOffset(4, 58)
Accent.Position = UDim2.fromOffset(0, 18)
Accent.BackgroundColor3 = Color3.fromRGB(70, 205, 125)
Accent.BorderSizePixel = 0
Accent.Parent = Toast

local Title = Instance.new("TextLabel")
Title.Name = "Title"
Title.Size = UDim2.new(1, -28, 0, 28)
Title.Position = UDim2.fromOffset(18, 13)
Title.BackgroundTransparency = 1
Title.Text = "Saved successfully"
Title.TextColor3 = Color3.fromRGB(235, 245, 238)
Title.TextSize = 16
Title.Font = Enum.Font.GothamBold
Title.TextXAlignment = Enum.TextXAlignment.Left
Title.Parent = Toast

local Message = Instance.new("TextLabel")
Message.Name = "Message"
Message.Size = UDim2.new(1, -28, 0, 34)
Message.Position = UDim2.fromOffset(18, 43)
Message.BackgroundTransparency = 1
Message.Text = "Your changes are ready."
Message.TextColor3 = Color3.fromRGB(160, 185, 168)
Message.TextSize = 13
Message.Font = Enum.Font.Gotham
Message.TextXAlignment = Enum.TextXAlignment.Left
Message.Parent = Toast`},
    {id:'scroll-list',name:'Scrolling list',category:'panels',icon:'▥',description:'A scrollable container with a header and vertical list layout.',code:`local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "ScrollingListDemo"
ScreenGui.Parent = game.Players.LocalPlayer:WaitForChild("PlayerGui")

local List = Instance.new("ScrollingFrame")
List.Name = "ItemList"
List.Size = UDim2.fromOffset(320, 300)
List.Position = UDim2.fromOffset(24, 24)
List.BackgroundColor3 = Color3.fromRGB(17, 27, 21)
List.BorderSizePixel = 0
List.ScrollBarThickness = 5
List.CanvasSize = UDim2.new(0, 0, 0, 420)
List.Parent = ScreenGui

local Corner = Instance.new("UICorner")
Corner.CornerRadius = UDim.new(0, 14)
Corner.Parent = List

local Layout = Instance.new("UIListLayout")
Layout.FillDirection = Enum.FillDirection.Vertical
Layout.SortOrder = Enum.SortOrder.LayoutOrder
Layout.Padding = UDim.new(0, 8)
Layout.Parent = List

local Padding = Instance.new("UIPadding")
Padding.PaddingTop = UDim.new(0, 12)
Padding.PaddingBottom = UDim.new(0, 12)
Padding.PaddingLeft = UDim.new(0, 12)
Padding.PaddingRight = UDim.new(0, 12)
Padding.Parent = List`},
    {id:'profile-card',name:'Player profile card',category:'panels',icon:'◉',description:'A profile layout with avatar image placeholder, player name, and status.',code:`local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "ProfileCardDemo"
ScreenGui.Parent = game.Players.LocalPlayer:WaitForChild("PlayerGui")

local Card = Instance.new("Frame")
Card.Name = "ProfileCard"
Card.Size = UDim2.fromOffset(350, 112)
Card.Position = UDim2.fromOffset(20, 20)
Card.BackgroundColor3 = Color3.fromRGB(19, 29, 23)
Card.BorderSizePixel = 0
Card.Parent = ScreenGui

local Corner = Instance.new("UICorner")
Corner.CornerRadius = UDim.new(0, 15)
Corner.Parent = Card

local Avatar = Instance.new("ImageLabel")
Avatar.Name = "Avatar"
Avatar.Size = UDim2.fromOffset(72, 72)
Avatar.Position = UDim2.fromOffset(16, 20)
Avatar.BackgroundColor3 = Color3.fromRGB(42, 60, 48)
Avatar.BorderSizePixel = 0
Avatar.Image = ""
Avatar.Parent = Card

local AvatarCorner = Instance.new("UICorner")
AvatarCorner.CornerRadius = UDim.new(1, 0)
AvatarCorner.Parent = Avatar

local PlayerName = Instance.new("TextLabel")
PlayerName.Name = "PlayerName"
PlayerName.Size = UDim2.new(1, -110, 0, 30)
PlayerName.Position = UDim2.fromOffset(102, 26)
PlayerName.BackgroundTransparency = 1
PlayerName.Text = "Player Name"
PlayerName.TextColor3 = Color3.fromRGB(240, 245, 240)
PlayerName.TextSize = 18
PlayerName.Font = Enum.Font.GothamBold
PlayerName.TextXAlignment = Enum.TextXAlignment.Left
PlayerName.Parent = Card

local Status = Instance.new("TextLabel")
Status.Name = "Status"
Status.Size = UDim2.new(1, -110, 0, 24)
Status.Position = UDim2.fromOffset(102, 59)
Status.BackgroundTransparency = 1
Status.Text = "Online"
Status.TextColor3 = Color3.fromRGB(110, 220, 145)
Status.TextSize = 13
Status.Font = Enum.Font.Gotham
Status.TextXAlignment = Enum.TextXAlignment.Left
Status.Parent = Card`}
  ];
  const grid=document.getElementById('libraryGrid');
  if(!grid)return;
  const search=document.getElementById('librarySearch');
  const count=document.getElementById('libraryCount');
  let filter='all';
  function render(){
    const q=(search.value||'').trim().toLowerCase();
    const visible=items.filter(x=>(filter==='all'||x.category===filter)&&(!q||(x.name+' '+x.description+' '+x.category).toLowerCase().includes(q)));
    count.textContent=visible.length+' / '+items.length+' components';
    grid.innerHTML='';
    if(!visible.length){grid.innerHTML='<div class="library-empty">No components found. Try another search.</div>';return;}
    visible.forEach(item=>{
      const card=document.createElement('article');card.className='library-card';
      const top=document.createElement('div');top.className='library-card-top';
      const icon=document.createElement('span');icon.className='library-icon';icon.textContent=item.icon;
      const tag=document.createElement('span');tag.className='library-tag';tag.textContent=item.category;
      top.append(icon,tag);
      const title=document.createElement('h3');title.textContent=item.name;
      const desc=document.createElement('p');desc.textContent=item.description;
      const btn=document.createElement('button');btn.type='button';btn.className='btn main';btn.textContent='Insert template';
      btn.addEventListener('click',()=>{
        const editor=document.getElementById('src');
        editor.value=item.code;
        editor.dispatchEvent(new Event('input',{bubbles:true}));
        editor.focus();
        document.getElementById('src').scrollIntoView({behavior:'smooth',block:'center'});
        const status=document.getElementById('msg');
        if(status)status.textContent=item.name+' inserted. Review the code before exporting.';
      });
      card.append(top,title,desc,btn);grid.appendChild(card);
    });
  }
  document.querySelectorAll('.library-filter').forEach(btn=>btn.addEventListener('click',()=>{
    filter=btn.dataset.filter;
    document.querySelectorAll('.library-filter').forEach(x=>x.classList.toggle('active',x===btn));
    render();
  }));
  search.addEventListener('input',render);
  render();
})();
