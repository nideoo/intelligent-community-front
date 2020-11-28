<template>
    <el-container class="videoMonitor">
        <el-header class="headerPage"></el-header>
        <el-main class="content-box h_100">
            <el-container class="h_100">
                <el-aside class="tree-side">
                    <slide-tree v-on:handleNode="handleNode"></slide-tree>
                </el-aside>
                <el-container class="videoMonitor-main">
                    <el-header class="flex-end videoMonitor-main-top">
                        <button class="btns">跳转</button>
                    </el-header>
                    <el-container class="videoMonitor-main-content h_100">
                        <el-main class="videoMonitor-main-video">
                            <div class="video-box" id="video-box">
                                <img src="../../../../static/img/video/video-sp.png"/>
                            </div>
                        </el-main>
                        <el-footer class="videoMonitor-main-snap">
                            <div class="snap-info flex-parent">
                                <div class="snap-icon flex-col flex-center">
                                    <div class="snap-icon-img">
                                        <img src="../../../../static/img/video/snap-icon-xr.png"/>
                                    </div>
                                    <h6>行人</h6>
                                </div>
                                <el-row class="snap-list" :gutter="10">
                                    <el-col class="snap-list-li" :span="4">
                                        <div class="snap-img">
                                            <i class="icon icon-rightTop"></i>
                                            <i class="icon icon-leftTop"></i>
                                            <i class="icon icon-rightBot"></i>
                                            <i class="icon icon-leftBot"></i>
                                            <img src="../../../../static/img/video/snap-img.png"/>
                                        </div>
                                        <div class="snap-word">
                                            2019.02.21 12:23:00
                                        </div>
                                    </el-col>
                                    <el-col class="snap-list-li" :span="4">
                                        <div class="snap-img">
                                            <i class="icon icon-rightTop"></i>
                                            <i class="icon icon-leftTop"></i>
                                            <i class="icon icon-rightBot"></i>
                                            <i class="icon icon-leftBot"></i>
                                            <img src="../../../../static/img/video/snap-img.png"/>
                                        </div>
                                        <div class="snap-word">
                                            2019.02.21 12:23:00
                                        </div>
                                    </el-col>
                                    <el-col class="snap-list-li" :span="4">
                                        <div class="snap-img">
                                            <i class="icon icon-rightTop"></i>
                                            <i class="icon icon-leftTop"></i>
                                            <i class="icon icon-rightBot"></i>
                                            <i class="icon icon-leftBot"></i>
                                            <img src="../../../../static/img/video/snap-img.png"/>
                                        </div>
                                        <div class="snap-word">
                                            2019.02.21 12:23:00
                                        </div>
                                    </el-col>
                                    <el-col class="snap-list-li" :span="4">
                                        <div class="snap-img">
                                            <i class="icon icon-rightTop"></i>
                                            <i class="icon icon-leftTop"></i>
                                            <i class="icon icon-rightBot"></i>
                                            <i class="icon icon-leftBot"></i>
                                            <img src="../../../../static/img/video/snap-img.png"/>
                                        </div>
                                        <div class="snap-word">
                                            2019.02.21 12:23:00
                                        </div>
                                    </el-col>
                                    <el-col class="snap-list-li" :span="4">
                                        <div class="snap-img">
                                            <i class="icon icon-rightTop"></i>
                                            <i class="icon icon-leftTop"></i>
                                            <i class="icon icon-rightBot"></i>
                                            <i class="icon icon-leftBot"></i>
                                            <img src="../../../../static/img/video/snap-img.png"/>
                                        </div>
                                        <div class="snap-word">
                                            2019.02.21 12:23:00
                                        </div>
                                    </el-col>
                                    <el-col class="snap-list-li" :span="4">
                                        <div class="snap-img">
                                            <i class="icon icon-rightTop"></i>
                                            <i class="icon icon-leftTop"></i>
                                            <i class="icon icon-rightBot"></i>
                                            <i class="icon icon-leftBot"></i>
                                            <img src="../../../../static/img/video/snap-img.png"/>
                                        </div>
                                        <div class="snap-word">
                                            2019.02.21 12:23:00
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-footer>
                    </el-container>
                </el-container>
            </el-container>
        </el-main>
    </el-container>
</template>
<script>
    import slideTree from '@/components/modules/tree'

    export default {
        name: "humanHouse",
        data() {
            return {}
        },
        components: {slideTree},
        methods: {
            handleNode(data) {

            },
        },

        mounted() {

        }
    }
</script>