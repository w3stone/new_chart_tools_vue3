<template>
    <div class="error_page error_404">
        <div class="error_box center">
            <ul class="error_logo">
                    <li><img :src="imgDomain + '/num_5.png'" /></li>
                    <li class="error_logo_middle"><img :src="imgDomain + '/medical.png'" /></li>
                    <li><img :src="imgDomain + '/num_0.png'" /></li>
                </ul>
            <p class="bottom_line"></p>
            <h3 class="not_found">没有找到您要访问的页面</h3>
        </div>
    </div>
</template>

<script>
	export default {
        name:'page500',
        computed:{
            ...mapState({
                "imgDomain": state => state.imgDomain
            })
        },
        mounted(){
            this.setLoading(false);
        },
        methods:{
            ...mapMutations({
                setLoading: "setLoading"
            })
        }
	}
</script>