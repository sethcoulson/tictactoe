
def rotate( b:tuple ):
    return (b[6], b[3], b[0], b[7], b[4], b[1], b[8], b[5], b[2] )
    
def reflect( b:tuple ):
    return (b[2], b[1], b[0], b[5], b[4], b[3], b[8], b[7], b[6] )

def equiv( b:tuple ):
    return set( [b, 
            rotate(b),
            rotate( rotate( b ) ),
            rotate( rotate( rotate( b ))), 
            reflect(b),
            rotate( reflect(b) ),
            rotate( rotate( reflect(b) )),
            rotate( rotate( rotate( reflect(b)))) ] )

def next_moves( b: tuple ):
    rv = []

    if not terminal_state( b )[ "terminal" ]:
        os = b.count("o")
        xs = b.count("x")
        next = "o" if os == xs else "x"
        
        for i in range(0, 9):
            tmp = list(b)
            if tmp[i] == "":
                tmp[i] = next
                rv.append( tuple(tmp) )
    
    return rv
    
def terminal_state( b ):

    if (b[0] != "") and ((b[0]==b[1] and b[1]==b[2]) or (b[0]==b[3] and b[3]==b[6]) or (b[0]==b[4] and b[4]==b[8])):
        rv = {"terminal": True, "type": "win", "player": b[0] }
    elif (b[4]!="") and ((b[3]==b[4] and b[4]==b[5]) or (b[1]==b[4] and b[4]==b[7]) or (b[2]==b[4] and b[4]==b[6])):
        rv = {"terminal": True, "type": "win", "player": b[4] }
    elif b[6]!="" and b[6]==b[7] and b[7]==b[8]:
        rv = {"terminal": True, "type": "win", "player": b[6] }
    elif b[2]!="" and b[2]==b[5] and b[5]==b[8]:
        rv = {"terminal": True, "type": "win", "player": b[2] }
    elif b.count("x")+b.count("o")==9:
        rv = {"terminal": True, "type": "draw" }
    else:
        rv = {"terminal": False}
    
    return rv

def accum( game, acc, level=0, max_level=0 ):
    if level < max_level:
        acc.add( game )
        moves = next_moves( game );

        for i in moves:
            accum( i, acc, level+1, max_level )
        

def all_game_states():
    max_level = 10
    G = ( "","","","","","","","","")
    game_states = set()
    accum( G, game_states, 0, max_level )

    #Calculate equivs
    cache = dict()
    for g in game_states:
        equivs = equiv( g )
        for b in equivs:
            if b not in cache.keys():
                cache[ b ] = g

    #Calculate parents
    parents = dict()
    for g in game_states:
        next = next_moves( g )
        for n in next:
            if n not in parents:
                parents[n] = []
            parents[ n ].append( g )

    return ( game_states, cache, parents )



#[print( x ) for x in next_moves( ("o","o","o","x","x","","","","")) ]
( game_states, cache, parents ) = all_game_states()

print( parents[ ("o","o","o", "x","x","", "","","")])
print( len( game_states) ,"\t", len( set(cache.values()) ), "\t", len(parents))
#uniq = list( set( cache.values() ))
#uniq.sort( key = lambda x: x.count("x") + x.count("o"))

#f = filter( lambda x: x.count("x")+x.count("o")>7, uniq )

#[ print( x ) for x in list(f) ]
