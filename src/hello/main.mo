actor Main {
    stable var val: Nat = 1;

    public query func get() : async Nat {
        val
    };

    public func update() : async () {
        val *= 2;
    };
}
