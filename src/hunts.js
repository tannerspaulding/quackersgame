/* ---------- Second hunt ---------- */
/* Once every duck in a world is in the Duck Log, a second hunt opens there: new ducks hide in the same places.
   They have their own log in that world and don't change the main duck count. */
const HUNTS={
 yard:[
  {id:"h2_cloud",name:"Cloud Duck",tier:"Tricky",area:"yard",c:{body:"#ffffff",wing:"#d6ecff",beak:"#ffb347"},hint:"Head in the clouds"},
  {id:"h2_sunny",name:"Sunny Duck",tier:"Sneaky",area:"garden",c:{body:"#ffb52e",wing:"#f08c00",beak:"#ff6f3d"},acc:"shades",hint:"Sunbathing in the flowers"},
  {id:"h2_reed",name:"Reed Duck",tier:"Easy",area:"pond",c:{body:"#c89260",wing:"#a06a40",beak:"#ffcb2f"},hint:"Tall grass by the water"},
  {id:"h2_birdie",name:"Birdhouse Duck",tier:"Tricky",area:"treetop",c:{body:"#8fd0ff",wing:"#5aa8e6",beak:"#ff8a3d"},hint:"Knock knock, who's home?"},
  {id:"h2_picture",name:"Picture Duck",tier:"Rare",area:"house",c:{body:"#b48cff",wing:"#8e6ad8",beak:"#ffcb2f"},acc:"bow",hint:"Hanging on the wall"}],
 manor:[
  {id:"h2_chimney",name:"Chimney Duck",tier:"Tricky",area:"gate",c:{body:"#6a6a78",wing:"#4a4a56",beak:"#ff8a3d"},hint:"Up on the roof"},
  {id:"h2_clock",name:"Clock Duck",tier:"Sneaky",area:"hall",c:{body:"#c8963a",wing:"#a07024",beak:"#ff8a3d"},acc:"bowtie",hint:"Tick tock"},
  {id:"h2_bookworm",name:"Bookworm Duck",tier:"Sneaky",area:"library",c:{body:"#3fb86a",wing:"#2e8f50",beak:"#ffcb2f"},acc:"specs",hint:"A comfy reading spot"},
  {id:"h2_cupboard",name:"Cupboard Duck",tier:"Tricky",area:"kitchen",c:{body:"#ffe6a8",wing:"#f2c66a",beak:"#ff8a3d"},hint:"Peeking past the cupboard"},
  {id:"h2_dusty",name:"Dusty Duck",tier:"Rare",area:"attic",c:{body:"#bdb6a8",wing:"#9a9385",beak:"#d9a06a"},acc:"web",hint:"Behind the old trunk"}]};
