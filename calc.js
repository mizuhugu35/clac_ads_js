multi_table_ =
      [[1.0, 0.9, 0.6],
       [1.5, 0.59, 0.59],
       [2.0, 0.49, 0.49],
       [2.5, 0.42, 0.42],
       [3.0, 0.35, 0.35],
       [4.0, 0.3,  0.3],
       [5.0, 0.22, 0.22],
       [12.0, 0.092, 0.14]];

PI_ = 3.14159265358;

function DecToRad(deg){
    console.log("DEBUG: DegToRad called.");
    return deg*(PI_/180.0);
}

function RadToDec(rad){
    console.log("DEBUG: RadToDeg called.");
    return rad*(180.0/PI_);
}

function HorizontalFov(vertical_fov, aspect_ratio_x, aspect_ratio_y){
    console.log("DEBUG: calc horizontal fov.");
    let AspectRatio = (aspect_ratio_x / aspect_ratio_y);
    let VerticalFovHalf_rad = DecToRad(vertical_fov/2.0);
    let Arctan_arg = (Math.tan(VerticalFovHalf_rad) * AspectRatio);
    return 2 * RadToDec(Math.atan(Arctan_arg));
}

function VerticalFov(aspect_ratio_x, aspect_ratio_y){
    console.log("DEBUG: calc vertical fov.");
    let AspectRatio = (aspect_ratio_x / aspect_ratio_y);
    let Arctan_arg = Math.tan(DecToRad(75)/AspectRatio);
    return 2 * Math.atan(Arctan_arg);
}

function FovAdjustment(fov_multi, vertical_fov){
    let Tan_arg0 = DecToRad((fov_multi * vertical_fov)/ 2.0);
    let Tan_arg1 = DecToRad(vertical_fov/2.0);
    return Math.tan(Tan_arg0)/Math.tan(Tan_arg1);
}

function CalcNewADS(ads_multi, fov_adj, old_ads){
    return (ads_multi/fov_adj)*old_ads;
}

function GenMultiTable(id){
    console.log("DEBUG: [INFO] Genmultitable called.");
    var select_elem = document.getElementById(id);
    if(select_elem==undefined) console.log("DEBUG: [ERROR] Multi table is undefined.");
    
    for(let i=0; i<8; i++){
        let elem = document.createElement('option');
        elem.value = i;
        elem.innerHTML = multi_table_[i][0];        
        select_elem.appendChild(elem);
        console.log("DEBUG: [INFO] append child element to ID["+id+"]. child info->", elem);        
    }
}

function isString(obj) {
    return typeof (obj) == "string" || obj instanceof String;
};

function calc(h_fov, v_fov, fov_a, ap_x, ap_y, old_ads, new_ads){
    console.log("DEBUG: starting calculation...");
    
    var h_fov_e = document.getElementById(h_fov);
    var v_fov_e = document.getElementById(v_fov);
    var fov_a_e = document.getElementById(fov_a);
    var ap_x_e  = document.getElementById(ap_x);
    var ap_y_e  = document.getElementById(ap_y);
    var old_ads_e = document.getElementById(old_ads);
    var new_ads_e = document.getElementById(new_ads);
    var table_idx = document.getElementById('multi-table').value;

    if(v_fov_e.value<0||ap_x_e.value<0||ap_y_e.value<0||old_ads_e.value<0){
        alert("パラメータの値が不正です");
        return;
    }
    
    var H_fov = HorizontalFov(v_fov_e.value, ap_x_e.value, ap_y_e.value);
    var F_adj = FovAdjustment(multi_table_[table_idx][1], v_fov_e.value);
    var N_ads = CalcNewADS(multi_table_[table_idx][2], F_adj, old_ads_e.value);

    h_fov_e.value = H_fov;
    fov_a_e.value = F_adj;
    new_ads_e.value = N_ads;

    console.log("DEBUG: finished calculation.");
}
