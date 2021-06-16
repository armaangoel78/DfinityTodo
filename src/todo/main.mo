import List "mo:base/List";

actor Main {
    flexible var items : List.List<Text> = List.nil();

    public query func get() : async List.List<Text> {
        items
    };

    public func add(_new : Text) : async List.List<Text> {
        items := List.push(_new, items);
        items
    };
}
