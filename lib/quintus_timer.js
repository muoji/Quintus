Quintus.Timer = function(Q) {

Q.Evented.extend("Timer", {
    init: function(options) {
        this.elapsed_time = 0;
        this.tick_interval = options.tick;
        this.timeout_time = options.timeout;
    },

    step: function(dt) {
        if(this.tick_interval) {
            var old = this.elapsed_time % this.tick_interval;
            if(this.tick_interval < old+dt) {
                this.ticks++;
                this.trigger("tick", this.ticks);
            }
        }
        this.elapsed_time += dt;
        if(this.timeout_time) {
            if(this.elapsed_time >= this.timeout_time) {
                this.trigger("timeout");
                this.stop();
            }
        }
    },

    start: function(stage) {
        this.stage = stage || Q.stage();
        this.stage.on("step", this, "step");
        this.elapsed_time = 0;
        this.ticks = 0;
        return this;
    },

    stop: function() {
        this.stage.off("step", this, "step");
        return this;
    }
});

};
